/* eslint-disable max-statements */
import { createHash } from 'node:crypto'
import { existsSync, promises as fs } from 'fs'
import type { SupportedLanguages } from '../../interfaces.d.ts'
import { FileFunction } from './compilerInterfaces'
import { compileCardsIncremental } from './endpoints/cards'
import {
	computeCompilerHash,
	computeLangAggregateHash,
	computeRemoteAssetsHash,
	ensureManifest,
	isForceCompile,
	loadManifest,
	manifestKey,
	saveManifest,
} from './utils/compileCache'
import { fetchRemoteFile } from './utils/util'

const LANGS: Array<SupportedLanguages> = [
	'en', 'fr', 'es', 'es-mx', 'it', 'pt', 'pt-br', 'pt-pt', 'de', 'nl', 'pl', 'ru',
	'ja', 'ko', 'zh-tw', 'id', 'th', 'zh-cn'
]

const DIST_FOLDER = './generated'
const force = isForceCompile()

;(async () => {
	const paths = (await fs.readdir('./compiler/endpoints')).filter((p) => p.endsWith('.ts'))
	const totalSteps = LANGS.length * paths.length
	let progressIndex = 0

	console.log('1. Loading remote sources')
	await fetchRemoteFile('https://assets.tcgdex.net/datas.json')

	const compilerHash = await computeCompilerHash()
	const remoteAssetsHash = await computeRemoteAssetsHash()
	let manifest = await loadManifest()
	manifest = await ensureManifest(manifest, compilerHash, remoteAssetsHash)

	if (force) {
		console.log('Force mode: clearing generated output and compile manifest')
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

	console.log('\n2. Compiling files (incremental cache enabled; use --force for full rebuild)')

	for await (const lang of LANGS) {
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
				console.log('      ', 'Compiling', lang, file)
				const { cards, setsCompiled, setsSkipped } = await compileCardsIncremental(
					lang,
					manifest,
					force,
				)
				await fs.writeFile(outputFile, JSON.stringify(cards))
				console.log(
					`${(++progressIndex / totalSteps * 100).toFixed(2).padStart(5, '0')}%`,
					'Compiled',
					lang,
					file,
					`(${setsCompiled} sets rebuilt, ${setsSkipped} cached)`,
				)
				continue
			}

			const entryKey = manifestKey(lang, endpoint)
			const aggregateHash = await createEndpointInputHash(
				lang,
				endpoint,
				manifest,
				compilerHash,
				remoteAssetsHash,
			)

			if (
				!force &&
				manifest.entries[entryKey]?.inputHash === aggregateHash &&
				existsSync(outputFile)
			) {
				console.log(
					`${(++progressIndex / totalSteps * 100).toFixed(2).padStart(5, '0')}%`,
					'Skipped',
					lang,
					file,
					'(cache hit)',
				)
				continue
			}

			const fn = (await import(`./endpoints/${file}`)).default as FileFunction
			console.log('      ', 'Compiling', lang, file)
			const item = await fn(lang)
			await fs.writeFile(outputFile, JSON.stringify(item))

			manifest.entries[entryKey] = {
				inputHash: aggregateHash,
				compiledAt: new Date().toISOString(),
			}

			console.log(`${(++progressIndex / totalSteps * 100).toFixed(2).padStart(5, '0')}%`, 'Compiled ', lang, file)
		}
	}

	await saveManifest(manifest)

	console.log('3. Copying static files to public folder')
	for await (const file of await fs.readdir('../meta/definitions')) {
		await fs.copyFile('../meta/definitions/' + file, './public/v2/' + file)
	}
})()

async function createEndpointInputHash(
	lang: SupportedLanguages,
	endpoint: string,
	manifest: Awaited<ReturnType<typeof ensureManifest>>,
	compilerHash: string,
	remoteAssetsHash: string,
): Promise<string> {
	const langAggregate = await computeLangAggregateHash(lang, manifest)
	return createHash('sha256')
		.update(compilerHash)
		.update('\0')
		.update(remoteAssetsHash)
		.update('\0')
		.update(endpoint)
		.update('\0')
		.update(langAggregate)
		.digest('hex')
}
