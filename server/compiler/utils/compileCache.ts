import { createHash } from 'node:crypto'
import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'
import type { SupportedLanguages } from '../../../interfaces.d.ts'
import { dedupeSetCandidates, parseSetIdFromSource } from './setDedupe'
import { resolveCompileConcurrency, runPool } from './compilePool'
import { DB_PATH, fetchRemoteFile, getDataFolder, isLocalDevCompile, smartGlob } from './util'

export const MANIFEST_VERSION = 2
export const MANIFEST_PATH = './generated/.compile-manifest.json'

export type ExpansionEndpoint = 'cards' | 'set' | 'stats'

export interface ManifestEntry {
	inputHash: string
	compiledAt: string
	setApiId?: string
}

export interface CompileManifest {
	version: number
	compilerHash: string
	remoteAssetsHash: string
	entries: Record<string, ManifestEntry>
}

const COMPILER_INPUT_GLOBS = [
	'./compiler/**/*.ts',
	'../meta/legals/**/*.ts',
	'../meta/definitions/**/*.d.ts',
	'../interfaces.d.ts',
]

/** Primary cache key: expansion first, then locale. */
export function expansionManifestKey(
	setApiId: string,
	lang: SupportedLanguages,
	endpoint: ExpansionEndpoint,
): string {
	return `expansion:${setApiId}:${lang}:${endpoint}`
}

/** @deprecated Use expansionManifestKey */
export function manifestKey(
	lang: SupportedLanguages,
	endpoint: string,
	setId?: string,
): string {
	return setId ? `${lang}:${endpoint}:${setId}` : `${lang}:${endpoint}`
}

export function cardsShardPath(lang: SupportedLanguages, setApiId: string): string {
	return `./generated/${lang}/by-set/${setApiId}.json`
}

export function setMetaShardPath(lang: SupportedLanguages, setApiId: string): string {
	return `./generated/${lang}/by-set-meta/${setApiId}.json`
}

export function isForceCompile(): boolean {
	return process.argv.includes('--force')
}

function sha256UpdateHash(hash: ReturnType<typeof createHash>, filePath: string, content: Buffer | string): void {
	const normalized = filePath.replace(/\\/g, '/')
	hash.update(normalized)
	hash.update('\0')
	hash.update(content)
	hash.update('\0')
}

export async function hashFilePaths(filePaths: string[]): Promise<string> {
	const hash = createHash('sha256')
	for (const filePath of [...filePaths].sort((a, b) => a.localeCompare(b))) {
		try {
			const content = await fs.readFile(filePath)
			sha256UpdateHash(hash, filePath, content)
		} catch {
			sha256UpdateHash(hash, filePath, 'MISSING')
		}
	}
	return hash.digest('hex')
}

export async function computeCompilerHash(): Promise<string> {
	const files: string[] = []
	for (const pattern of COMPILER_INPUT_GLOBS) {
		files.push(...await smartGlob(pattern))
	}
	return hashFilePaths(files)
}

export async function computeRemoteAssetsHash(): Promise<string> {
	const datas = await fetchRemoteFile<unknown>('https://assets.tcgdex.net/datas.json')
	return createHash('sha256').update(JSON.stringify(datas)).digest('hex')
}

function migrateManifestEntries(entries: Record<string, ManifestEntry>): Record<string, ManifestEntry> {
	const next = { ...entries }
	for (const [key, entry] of Object.entries(entries)) {
		const legacyCards = key.match(/^([a-z]{2}(?:-[a-z]+)?):cards:([^:]+)$/)
		if (legacyCards) {
			const [, lang, setId] = legacyCards
			const migrated = expansionManifestKey(setId, lang as SupportedLanguages, 'cards')
			if (!next[migrated]) {
				next[migrated] = entry
			}
			delete next[key]
			continue
		}
		const legacySet = key.match(/^([a-z]{2}(?:-[a-z]+)?):set:([^:]+)$/)
		if (legacySet) {
			const [, lang, setId] = legacySet
			const migrated = expansionManifestKey(setId, lang as SupportedLanguages, 'set')
			if (!next[migrated]) {
				next[migrated] = entry
			}
			delete next[key]
		}
	}
	return next
}

export async function loadManifest(): Promise<CompileManifest | null> {
	if (!existsSync(MANIFEST_PATH)) {
		return null
	}
	try {
		const raw = await fs.readFile(MANIFEST_PATH, 'utf8')
		const parsed = JSON.parse(raw) as CompileManifest
		if (parsed.version !== MANIFEST_VERSION && parsed.version !== 1) {
			return null
		}
		return {
			...parsed,
			version: MANIFEST_VERSION,
			entries: migrateManifestEntries(parsed.entries ?? {}),
		}
	} catch {
		return null
	}
}

export async function saveManifest(manifest: CompileManifest): Promise<void> {
	await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true })
	await fs.writeFile(
		MANIFEST_PATH,
		`${JSON.stringify({ ...manifest, version: MANIFEST_VERSION }, null, 2)}\n`,
		'utf8',
	)
}

export interface SetSourceBundle {
	serieFolder: string
	setId: string
	setFile: string
	serieFile: string
	cardFiles: string[]
}

export async function listSetSourceBundles(
	lang: SupportedLanguages,
): Promise<Array<SetSourceBundle>> {
	const dataFolder = getDataFolder(lang)
	const setFiles = await smartGlob(`${DB_PATH}/${dataFolder}/*/*.ts`)
	const candidates: Array<SetSourceBundle & {
		canonicalId: string
		fileBase: string
		cardFileCount: number
	}> = []

	for (const setFile of setFiles) {
		const normalized = setFile.replace(/\\/g, '/')
		const parts = normalized.split('/')
		const fileBase = parts[parts.length - 1].replace(/\.ts$/, '')
		const serieFolder = parts[parts.length - 2]
		const serieFile = `${DB_PATH}/${dataFolder}/${serieFolder}.ts`
		const cardFiles = await smartGlob(`${DB_PATH}/${dataFolder}/${serieFolder}/${fileBase}/*.ts`)
		const canonicalId = parseSetIdFromSource(setFile) ?? fileBase

		candidates.push({
			serieFolder,
			setId: fileBase,
			setFile,
			serieFile,
			cardFiles,
			canonicalId,
			fileBase,
			cardFileCount: cardFiles.length,
		})
	}

	const deduped = dedupeSetCandidates(candidates)

	return deduped.sort((a, b) =>
		`${a.serieFolder}/${a.setId}`.localeCompare(`${b.serieFolder}/${b.setId}`),
	)
}

export function effectiveCacheRemoteHash(remoteAssetsHash: string): string {
	return isLocalDevCompile() ? '' : remoteAssetsHash
}

export function resolveSetApiId(bundle: SetSourceBundle): string {
	return parseSetIdFromSource(bundle.setFile) ?? bundle.setId
}

export async function computeSetInputHash(
	bundle: SetSourceBundle,
	compilerHash: string,
	remoteAssetsHash: string,
): Promise<string> {
	const files = [
		bundle.setFile,
		bundle.serieFile,
		...bundle.cardFiles,
	]
	const sourceHash = await hashFilePaths(files)
	return createHash('sha256')
		.update(compilerHash)
		.update('\0')
		.update(effectiveCacheRemoteHash(remoteAssetsHash))
		.update('\0')
		.update(sourceHash)
		.digest('hex')
}

export function lookupExpansionEntry(
	manifest: CompileManifest,
	setApiId: string,
	lang: SupportedLanguages,
	endpoint: ExpansionEndpoint,
): ManifestEntry | undefined {
	return manifest.entries[expansionManifestKey(setApiId, lang, endpoint)]
}

export async function shardFileValid(shardPath: string): Promise<boolean> {
	try {
		const stat = await fs.stat(shardPath)
		return stat.size > 2
	} catch {
		return false
	}
}

export interface ExpansionBuildPlan {
	setApiId: string
	bundle: SetSourceBundle
	inputHash: string
}

export async function planExpansionBuilds(
	lang: SupportedLanguages,
	manifest: CompileManifest,
	force: boolean,
	endpoint: 'cards' | 'set',
): Promise<{ toCompile: ExpansionBuildPlan[]; skipped: ExpansionBuildPlan[] }> {
	const bundles = await listSetSourceBundles(lang)
	const concurrency = resolveCompileConcurrency()

	const plans = await runPool(
		bundles,
		async (bundle) => {
			const setApiId = resolveSetApiId(bundle)
			const inputHash = await computeSetInputHash(
				bundle,
				manifest.compilerHash,
				manifest.remoteAssetsHash,
			)
			const entry = lookupExpansionEntry(manifest, setApiId, lang, endpoint)
			const shardPath = endpoint === 'cards'
				? cardsShardPath(lang, setApiId)
				: setMetaShardPath(lang, setApiId)

			const plan: ExpansionBuildPlan = { setApiId, bundle, inputHash }
			const cached = !force && entry?.inputHash === inputHash && (await shardFileValid(shardPath))
			return { plan, cached }
		},
		concurrency,
	)

	const toCompile: ExpansionBuildPlan[] = []
	const skipped: ExpansionBuildPlan[] = []
	for (const { plan, cached } of plans) {
		if (cached) {
			skipped.push(plan)
		} else {
			toCompile.push(plan)
		}
	}

	return { toCompile, skipped }
}

export function computeExpansionAggregateHash(
	manifest: CompileManifest,
	lang: SupportedLanguages,
	endpoint: ExpansionEndpoint,
): string {
	const hash = createHash('sha256')
	const suffix = `:${lang}:${endpoint}`
	const entries = Object.entries(manifest.entries)
		.filter(([key]) => key.startsWith('expansion:') && key.endsWith(suffix))
		.sort(([a], [b]) => a.localeCompare(b))

	for (const [key, entry] of entries) {
		hash.update(key)
		hash.update(entry.inputHash)
	}

	return hash.digest('hex')
}

export async function computeSeriesInputHash(
	lang: SupportedLanguages,
	compilerHash: string,
	remoteAssetsHash: string,
): Promise<string> {
	const dataFolder = getDataFolder(lang)
	const serieFiles = await smartGlob(`${DB_PATH}/${dataFolder}/*.ts`)
	return createHash('sha256')
		.update(compilerHash)
		.update('\0')
		.update(effectiveCacheRemoteHash(remoteAssetsHash))
		.update('\0')
		.update(await hashFilePaths(serieFiles))
		.digest('hex')
}

export function isManifestValidForBuild(
	manifest: CompileManifest | null,
	compilerHash: string,
	remoteAssetsHash: string,
): manifest is CompileManifest {
	if (!manifest) {
		return false
	}
	if (manifest.compilerHash !== compilerHash) {
		return false
	}
	if (isLocalDevCompile()) {
		return true
	}
	return manifest.remoteAssetsHash === remoteAssetsHash
}

export async function ensureManifest(
	manifest: CompileManifest | null,
	compilerHash: string,
	remoteAssetsHash: string,
): Promise<CompileManifest> {
	if (isManifestValidForBuild(manifest, compilerHash, remoteAssetsHash)) {
		return manifest
	}
	const dim = process.stdout.isTTY && !process.env.NO_COLOR ? '\x1b[2m' : ''
	const reset = process.stdout.isTTY && !process.env.NO_COLOR ? '\x1b[0m' : ''
	if (manifest) {
		if (manifest.compilerHash !== compilerHash) {
			console.log(`${dim}  ↳ caché: código del compilador cambió → manifest vacío${reset}`)
		} else if (!isLocalDevCompile() && manifest.remoteAssetsHash !== remoteAssetsHash) {
			console.log(`${dim}  ↳ caché: assets remotos cambiaron → manifest vacío${reset}`)
		}
	} else {
		console.log(`${dim}  ↳ caché: sin manifest previo (primera compilación o --force)${reset}`)
	}
	return {
		version: MANIFEST_VERSION,
		compilerHash,
		remoteAssetsHash,
		entries: {},
	}
}

export function recordExpansionEntry(
	manifest: CompileManifest,
	setApiId: string,
	lang: SupportedLanguages,
	endpoint: ExpansionEndpoint,
	inputHash: string,
): void {
	manifest.entries[expansionManifestKey(setApiId, lang, endpoint)] = {
		inputHash,
		compiledAt: new Date().toISOString(),
		setApiId,
	}
}
