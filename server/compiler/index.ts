/* eslint-disable max-statements */
import { existsSync, promises as fs } from 'fs'
import type { SupportedLanguages } from '../../interfaces.d.ts'
import { FileFunction } from './compilerInterfaces'
import { compileCardsIncremental } from './endpoints/cards'
import { compileSetsIncremental } from './endpoints/sets'
import { compileStatsIncremental } from './endpoints/stats'
import {
	computeCompilerHash,
	computeRemoteAssetsHash,
	computeSeriesInputHash,
	ensureManifest,
	isForceCompile,
	loadManifest,
	manifestKey,
	saveManifest,
} from './utils/compileCache'
import { CompileLogger } from './utils/compileLog'
import { resolveCompileConcurrency } from './utils/compilePool'
import { initRemoteDatas } from './utils/remoteDatas'
import { isLocalDevCompile, shouldSkipGitTimestamps } from './utils/util'

const ALL_LANGS: Array<SupportedLanguages> = [
	'en', 'fr', 'es', 'es-mx', 'it', 'pt', 'pt-br', 'pt-pt', 'de', 'nl', 'pl', 'ru',
	'ja', 'ko', 'zh-tw', 'id', 'th', 'zh-cn'
]

function resolveCompileLangs(): Array<SupportedLanguages> {
	const fromEnv = process.env.COMPILE_LANGS?.trim()
	if (!fromEnv) {
		return ALL_LANGS
	}
	const requested = fromEnv.split(',').map((l) => l.trim()).filter(Boolean)
	const langs = requested.filter((l): l is SupportedLanguages =>
		(ALL_LANGS as readonly string[]).includes(l),
	)
	if (langs.length === 0) {
		console.warn('COMPILE_LANGS no contiene idiomas válidos; usando todos')
		return ALL_LANGS
	}
	return langs
}

const DIST_FOLDER = './generated'
const force = isForceCompile()

;(async () => {
	const LANGS = resolveCompileLangs()
	const paths = (await fs.readdir('./compiler/endpoints')).filter((p) => p.endsWith('.ts'))
	const totalSteps = LANGS.length * paths.length
	const logger = new CompileLogger(LANGS.length, totalSteps)

	logger.banner({
		langs: LANGS,
		concurrency: resolveCompileConcurrency(),
		localMode: isLocalDevCompile(),
		skipGit: shouldSkipGitTimestamps(),
		force,
	})

	logger.phase('Fuentes remotas')
	await initRemoteDatas()
	logger.phaseOk('datas.json cargado')

	const compilerHash = await computeCompilerHash()
	const remoteAssetsHash = await computeRemoteAssetsHash()
	let manifest = await loadManifest()
	manifest = await ensureManifest(manifest, compilerHash, remoteAssetsHash)
	if (isLocalDevCompile() && manifest.remoteAssetsHash !== remoteAssetsHash) {
		manifest.remoteAssetsHash = remoteAssetsHash
	}

	if (force) {
		logger.phase('Force: limpiando generated/ y manifest')
		try {
			await fs.rm(DIST_FOLDER, { recursive: true })
		} catch {}
		manifest = {
			version: manifest.version,
			compilerHash,
			remoteAssetsHash,
			entries: {},
		}
	}

	logger.phase('Compilación incremental (por expansión)')

	for await (const lang of LANGS) {
		logger.langStart(lang)

		for await (const file of paths) {
			const endpoint = file.replace('.ts', '')
			const folder = `${DIST_FOLDER}/${lang}`
			const outputFile = `${folder}/${endpoint}.json`

			try {
				await fs.mkdir(folder, { recursive: true })
			} catch {
				// folder may already exist
			}

			if (endpoint === 'cards') {
				await compileCardsIncremental(lang, manifest, force, logger)
				await saveManifest(manifest)
				continue
			}

			if (endpoint === 'sets') {
				await compileSetsIncremental(lang, manifest, force, logger)
				await saveManifest(manifest)
				continue
			}

			if (endpoint === 'stats') {
				const { stats, rebuilt } = await compileStatsIncremental(lang, manifest, force)
				await saveManifest(manifest)
				if (rebuilt) {
					logger.endpointRebuilt(
						lang,
						endpoint,
						`${stats.count.toLocaleString('es')} cartas · ${stats.images.toLocaleString('es')} imágenes`,
					)
				} else {
					logger.endpointCacheHit(lang, endpoint, 'desde shards')
				}
				continue
			}

			const entryKey = manifestKey(lang, endpoint)
			const aggregateHash = await computeSeriesInputHash(lang, compilerHash, remoteAssetsHash)

			if (
				!force &&
				manifest.entries[entryKey]?.inputHash === aggregateHash &&
				existsSync(outputFile)
			) {
				logger.endpointCacheHit(lang, endpoint)
				continue
			}

			const fn = (await import(`./endpoints/${file}`)).default as FileFunction
			const item = await fn(lang)
			await fs.writeFile(outputFile, JSON.stringify(item))

			manifest.entries[entryKey] = {
				inputHash: aggregateHash,
				compiledAt: new Date().toISOString(),
			}

			logger.endpointRebuilt(lang, endpoint)
		}

		await saveManifest(manifest)
	}

	await saveManifest(manifest)

	logger.phase('Copiando definiciones estáticas → public/v2/')
	for await (const file of await fs.readdir('../meta/definitions')) {
		await fs.copyFile('../meta/definitions/' + file, './public/v2/' + file)
	}
	logger.phaseOk()

	logger.finalSummary()
})()
