import { createHash } from 'node:crypto'
import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'
import type { SupportedLanguages } from '../../../interfaces.d.ts'
import { DB_PATH, fetchRemoteFile, getDataFolder, smartGlob } from './util'

export const MANIFEST_VERSION = 1
export const MANIFEST_PATH = './generated/.compile-manifest.json'

export interface ManifestEntry {
	inputHash: string
	compiledAt: string
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

export function manifestKey(
	lang: SupportedLanguages,
	endpoint: string,
	setId?: string,
): string {
	return setId ? `${lang}:${endpoint}:${setId}` : `${lang}:${endpoint}`
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

export async function loadManifest(): Promise<CompileManifest | null> {
	if (!existsSync(MANIFEST_PATH)) {
		return null
	}
	try {
		const raw = await fs.readFile(MANIFEST_PATH, 'utf8')
		const parsed = JSON.parse(raw) as CompileManifest
		if (parsed.version !== MANIFEST_VERSION) {
			return null
		}
		return parsed
	} catch {
		return null
	}
}

export async function saveManifest(manifest: CompileManifest): Promise<void> {
	await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true })
	await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
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
	const bundles: Array<SetSourceBundle> = []

	for (const setFile of setFiles) {
		const normalized = setFile.replace(/\\/g, '/')
		const parts = normalized.split('/')
		const setId = parts[parts.length - 1].replace(/\.ts$/, '')
		const serieFolder = parts[parts.length - 2]
		const serieFile = `${DB_PATH}/${dataFolder}/${serieFolder}.ts`
		const cardFiles = await smartGlob(`${DB_PATH}/${dataFolder}/${serieFolder}/${setId}/*.ts`)

		bundles.push({
			serieFolder,
			setId,
			setFile,
			serieFile,
			cardFiles,
		})
	}

	return bundles.sort((a, b) =>
		`${a.serieFolder}/${a.setId}`.localeCompare(`${b.serieFolder}/${b.setId}`),
	)
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
		.update(remoteAssetsHash)
		.update('\0')
		.update(sourceHash)
		.digest('hex')
}

export async function computeLangAggregateHash(
	lang: SupportedLanguages,
	manifest: CompileManifest,
): Promise<string> {
	const hash = createHash('sha256')
	const cardEntries = Object.entries(manifest.entries)
		.filter(([key]) => key.startsWith(`${lang}:cards:`))
		.sort(([a], [b]) => a.localeCompare(b))

	for (const [key, entry] of cardEntries) {
		hash.update(key)
		hash.update(entry.inputHash)
	}

	const dataFolder = getDataFolder(lang)
	const serieFiles = await smartGlob(`${DB_PATH}/${dataFolder}/*.ts`)
	hash.update(await hashFilePaths(serieFiles))

	return hash.digest('hex')
}

export function isManifestValidForBuild(
	manifest: CompileManifest | null,
	compilerHash: string,
	remoteAssetsHash: string,
): manifest is CompileManifest {
	if (!manifest) {
		return false
	}
	return (
		manifest.compilerHash === compilerHash &&
		manifest.remoteAssetsHash === remoteAssetsHash
	)
}

export async function ensureManifest(
	manifest: CompileManifest | null,
	compilerHash: string,
	remoteAssetsHash: string,
): Promise<CompileManifest> {
	if (isManifestValidForBuild(manifest, compilerHash, remoteAssetsHash)) {
		return manifest
	}
	return {
		version: MANIFEST_VERSION,
		compilerHash,
		remoteAssetsHash,
		entries: {},
	}
}
