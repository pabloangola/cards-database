#!/usr/bin/env node
/**
 * Importa una expansión CardTrader a cards-database (datos mínimos para inventario).
 *
 * - Set + cartas .ts con nombre EN, rareza, categoría y cardtrader blueprint id
 * - Descarga imágenes CardTrader al directorio local (mismo layout que download-card-images.mjs)
 *
 * Requiere CARDTRADER_API_TOKEN (env o dittos-army-back/.env)
 *
 * Usage:
 *   node scripts/import-cardtrader-expansion.mjs --expansion-id 1991
 *   node scripts/import-cardtrader-expansion.mjs --expansion-id 2023 --locale ja
 *   node scripts/import-cardtrader-expansion.mjs --from-json ../dittos-army-back/data/cardtrader_only_not_in_tcgdex.json --limit 3
 *   node scripts/import-cardtrader-expansion.mjs --expansion-id 1991 --dry-run
 */

import { spawnSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
	extractBlueprintRarity,
	extractCollectorNumber,
	fetchBlueprints,
	fetchPokemonExpansions,
	inferCategory,
	loadCardTraderToken,
	normalizeBlueprints,
	resolveBlueprintImageUrl,
	toLocalId,
} from './lib/cardtrader-client.mjs'
import {
	downloadCardTraderImage,
	getDefaultImagesOutDir,
	loadEnglishSetIdsFromCatalog,
	loadOccupiedBaseSetFolders,
	mergeCardIndex,
	resolveImageFolder,
} from './lib/cardtrader-images.mjs'
import { cardsDirFor, resolveSetTarget } from './lib/cardtrader-set-resolve.mjs'
import { patchSetCardCount, writeCardFile, writeSetFile } from './lib/cardtrader-ts-writer.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')

function parseArgs(argv) {
	const opts = {
		expansionIds: [],
		fromJson: undefined,
		locale: 'ja',
		serie: undefined,
		setId: undefined,
		outDir: getDefaultImagesOutDir(),
		concurrency: 6,
		limit: Infinity,
		expansionLimit: Infinity,
		dryRun: false,
		skipImages: false,
		forceImages: false,
		forceSet: false,
		skipExistingCards: true,
		delayMs: 2500,
		compile: false,
		compileLangs: 'ja',
		help: false,
	}

	for (let i = 2; i < argv.length; i++) {
		const arg = argv[i]
		if (arg === '--expansion-id' && argv[i + 1]) opts.expansionIds.push(Number(argv[++i]))
		else if (arg === '--from-json' && argv[i + 1]) opts.fromJson = argv[++i]
		else if (arg === '--locale' && argv[i + 1]) opts.locale = argv[++i]
		else if (arg === '--serie' && argv[i + 1]) opts.serie = argv[++i]
		else if (arg === '--set-id' && argv[i + 1]) opts.setId = argv[++i]
		else if (arg === '--out' && argv[i + 1]) opts.outDir = argv[++i]
		else if (arg === '--concurrency' && argv[i + 1]) opts.concurrency = Math.max(1, Number(argv[++i]))
		else if (arg === '--limit' && argv[i + 1]) opts.limit = Number(argv[++i])
		else if (arg === '--expansion-limit' && argv[i + 1]) opts.expansionLimit = Number(argv[++i])
		else if (arg === '--dry-run') opts.dryRun = true
		else if (arg === '--skip-images') opts.skipImages = true
		else if (arg === '--force-images') opts.forceImages = true
		else if (arg === '--force-set') opts.forceSet = true
		else if (arg === '--overwrite-cards') opts.skipExistingCards = false
		else if (arg === '--delay-ms' && argv[i + 1]) opts.delayMs = Math.max(0, Number(argv[++i]))
		else if (arg === '--compile') opts.compile = true
		else if (arg === '--compile-langs' && argv[i + 1]) opts.compileLangs = argv[++i]
		else if (arg === '--help') opts.help = true
	}

	return opts
}

function printHelp() {
	console.log(`Import CardTrader expansion -> TCGdex cards-database (inventory-minimal)

Options:
  --expansion-id <id>     CardTrader expansion id (repeatable)
  --from-json <path>      JSON con { sets: [{ id, code, name }] } (p. ej. cardtrader_only_not_in_tcgdex.json)
  --locale <ja|en>        Carpeta destino: data-asia (ja) o data (en). Default: ja
  --serie <folder>        Forzar carpeta serie (BW, ADV, CT…)
  --set-id <id>           Forzar id TCGdex del set (BW1a, ADV1…)
  --out <dir>             Imágenes locales (default: TCGDEX_LOCAL_IMAGES_DIR o D:\\TcgDex images)
  --concurrency <n>       Descargas paralelas (default: 6)
  --limit <n>             Máx. cartas por expansión (testing)
  --expansion-limit <n>   Máx. expansiones al usar --from-json
  --dry-run               Solo informe, sin escribir
  --skip-images           No descargar imágenes
  --force-images          Re-descargar aunque existan
  --force-set             Reescribir .ts del set
  --overwrite-cards       Sobrescribir cartas existentes
  --delay-ms <n>          Pausa entre expansiones (default: 2500, rate limit CT)
  --compile               Tras todas las expansiones: labels + compile (una sola vez)
  --compile-langs <list>  Idiomas para compile (default: ja). Ej: ja,en

Env:
  CARDTRADER_API_TOKEN    Bearer token CardTrader API
`)
}

function runCatalogRefresh(compileLangs) {
	console.log('\nActualizando labels y compilando catálogo (una sola pasada)…')
	const labels = spawnSync(process.execPath, ['scripts/generate-set-english-labels.mjs'], {
		cwd: REPO_ROOT,
		stdio: 'inherit',
	})
	if (labels.status !== 0) {
		throw new Error('generate-set-english-labels falló')
	}
	const apply = spawnSync(process.execPath, ['scripts/apply-set-english-names.mjs'], {
		cwd: REPO_ROOT,
		stdio: 'inherit',
	})
	if (apply.status !== 0) {
		throw new Error('apply-set-english-names falló')
	}
	const compile = spawnSync(
		process.execPath,
		['scripts/compile-catalog.mjs'],
		{
			cwd: REPO_ROOT,
			stdio: 'inherit',
			env: {
				...process.env,
				COMPILE_LANGS: compileLangs,
			},
		},
	)
	if (compile.status !== 0) {
		throw new Error('compile-catalog falló')
	}
}

async function loadExpansionIdsFromJson(jsonPath, expansionLimit) {
	const raw = JSON.parse(await fs.readFile(jsonPath, 'utf8'))
	const sets = raw.sets ?? raw.cardtrader_only ?? raw
	if (!Array.isArray(sets)) throw new Error('JSON inválido: se esperaba array en sets')
	return sets.slice(0, expansionLimit).map((s) => s.id)
}

async function importExpansion(token, expansion, opts, shared) {
	const blueprints = normalizeBlueprints(await fetchBlueprints(token, expansion.id))
	if (blueprints.length === 0) {
		console.warn(`  [${expansion.id}] ${expansion.name}: sin blueprints`)
		return { cards: 0, images: 0, skipped: 0 }
	}

	const target = resolveSetTarget(expansion, {
		locale: opts.locale,
		serie: opts.serie,
		setId: opts.setId,
	})
	const cardsDir = cardsDirFor(target)
	const limited = blueprints.slice(0, Number.isFinite(opts.limit) ? opts.limit : blueprints.length)

	console.log(
		`  → set ${target.setId} @ ${path.relative(REPO_ROOT, target.setFilePath)}` +
			` (${limited.length} cartas, locale=${target.locale})`,
	)

	if (opts.dryRun) {
		for (const bp of limited.slice(0, 5)) {
			const localId = toLocalId(extractCollectorNumber(bp), bp.id)
			console.log(`     [dry] ${localId} ${bp.name_en ?? bp.name} blueprint=${bp.id}`)
		}
		if (limited.length > 5) console.log(`     … +${limited.length - 5} más`)
		return { cards: limited.length, images: 0, skipped: 0 }
	}

	const setResult = await writeSetFile(target, expansion, limited.length, {
		forceSet: opts.forceSet || target.isNewSet,
	})
	if (!setResult.written && !target.isNewSet) {
		await patchSetCardCount(target.setFilePath, limited.length)
	}

	const imageJobs = []
	let cardsWritten = 0
	let cardsSkipped = 0
	const usedLocalIds = new Set()
	const imageFolder = resolveImageFolder(
		target.setId,
		target.locale,
		shared.englishSetIds,
		shared.occupiedBaseSetIds,
	)
	if (imageFolder === target.setId) {
		shared.occupiedBaseSetIds.add(target.setId)
	}

	for (let i = 0; i < limited.length; i++) {
		const bp = limited[i]
		let localId = toLocalId(extractCollectorNumber(bp), i + 1)
		while (usedLocalIds.has(localId)) {
			localId = `${localId}_${bp.id}`
		}
		usedLocalIds.add(localId)

		const cardName = (bp.name_en ?? bp.name ?? `Card ${localId}`).trim()
		const rarity = extractBlueprintRarity(bp)
		const category = inferCategory(bp)

		const cardResult = await writeCardFile({
			cardsDir,
			setId: target.setId,
			localId,
			cardName,
			category,
			rarity,
			blueprintId: bp.id,
			locale: target.locale,
			skipExisting: opts.skipExistingCards,
		})

		if (cardResult.written) cardsWritten++
		else cardsSkipped++

		const imageUrl = resolveBlueprintImageUrl(bp)
		if (!opts.skipImages && imageUrl) {
			const tcgCardId = `${target.setId}-${localId}`

			imageJobs.push({
				lang: target.locale,
				setId: target.setId,
				folder: imageFolder,
				cardId: tcgCardId,
				name: cardName,
				blueprintId: bp.id,
				url: imageUrl,
				dest: path.join(imageFolder, `${tcgCardId}.png`),
			})
		}
	}

	let imagesDownloaded = 0
	let imagesSkipped = 0
	let imagesFailed = 0

	if (imageJobs.length > 0) {
		await fs.mkdir(opts.outDir, { recursive: true })
		let idx = 0
		async function worker() {
			while (idx < imageJobs.length) {
				const job = imageJobs[idx++]
				const destPath = path.join(opts.outDir, job.dest)
				try {
					const result = await downloadCardTraderImage(token, job.url, destPath, {
						force: opts.forceImages,
					})
					if (result === 'skipped') imagesSkipped++
					else imagesDownloaded++
				} catch (err) {
					imagesFailed++
					shared.imageFailures.push({
						expansionId: expansion.id,
						cardId: job.cardId,
						url: job.url,
						error: err instanceof Error ? err.message : String(err),
					})
				}
			}
		}
		await Promise.all(Array.from({ length: opts.concurrency }, () => worker()))
		shared.allImageJobs.push(...imageJobs)
	}

	const manifestEntry = {
		importedAt: new Date().toISOString(),
		cardtrader: { id: expansion.id, code: expansion.code, name: expansion.name },
		tcgdex: {
			locale: target.locale,
			serieFolder: target.serieFolder,
			setId: target.setId,
			setFile: path.relative(REPO_ROOT, target.setFilePath),
			cardsDir: path.relative(REPO_ROOT, cardsDir),
		},
		stats: {
			blueprints: limited.length,
			cardsWritten,
			cardsSkipped,
			imagesDownloaded,
			imagesSkipped,
			imagesFailed,
		},
	}

	shared.manifests.push(manifestEntry)

	console.log(
		`  ✓ cartas +${cardsWritten} (skip ${cardsSkipped}) | imgs ↓${imagesDownloaded} skip ${imagesSkipped} fail ${imagesFailed}`,
	)

	return {
		cards: cardsWritten,
		images: imagesDownloaded,
		skipped: cardsSkipped,
	}
}

async function main() {
	const opts = parseArgs(process.argv)
	if (opts.help) {
		printHelp()
		process.exit(0)
	}

	const token = loadCardTraderToken()
	if (!token) {
		console.error('Falta CARDTRADER_API_TOKEN (env o dittos-army-back/.env)')
		process.exit(1)
	}

	let expansionIds = [...opts.expansionIds]
	if (opts.fromJson) {
		const fromFile = await loadExpansionIdsFromJson(opts.fromJson, opts.expansionLimit)
		expansionIds = expansionIds.concat(fromFile)
	}
	expansionIds = [...new Set(expansionIds.filter((id) => Number.isInteger(id) && id > 0))]

	if (expansionIds.length === 0) {
		console.error('Indica --expansion-id o --from-json')
		printHelp()
		process.exit(1)
	}

	console.log(`CardTrader → TCGdex | ${expansionIds.length} expansión(es) | locale=${opts.locale}`)
	if (opts.dryRun) console.log('Modo: dry-run')

	const allExpansions = await fetchPokemonExpansions(token)
	const byId = new Map(allExpansions.map((e) => [e.id, e]))

	const shared = {
		englishSetIds: await loadEnglishSetIdsFromCatalog(REPO_ROOT, 'en'),
		occupiedBaseSetIds: await loadOccupiedBaseSetFolders(opts.outDir),
		allImageJobs: [],
		imageFailures: [],
		manifests: [],
	}

	for (let i = 0; i < expansionIds.length; i++) {
		const id = expansionIds[i]
		const expansion = byId.get(id)
		if (!expansion) {
			console.warn(`Expansión ${id} no encontrada en CardTrader (game_id=5)`)
			continue
		}
		if (i > 0 && opts.delayMs > 0) {
			console.log(`  (pausa ${opts.delayMs}ms — rate limit CardTrader)`)
			await new Promise((r) => setTimeout(r, opts.delayMs))
		}
		console.log(`\n[${expansion.id}] ${expansion.name} (${expansion.code})`)
		await importExpansion(token, expansion, opts, shared)
	}

	if (!opts.dryRun) {
		if (shared.allImageJobs.length > 0 && !opts.skipImages) {
			const indexPath = await mergeCardIndex(opts.outDir, shared.allImageJobs, false)
			console.log(`\nÍndice imágenes: ${indexPath}`)
		}

		const manifestDir = path.join(REPO_ROOT, 'meta', 'cardtrader-imports')
		await fs.mkdir(manifestDir, { recursive: true })
		const manifestPath = path.join(manifestDir, `import-${new Date().toISOString().replace(/[:.]/g, '-')}.json`)
		await fs.writeFile(
			manifestPath,
			JSON.stringify(
				{
					generatedAt: new Date().toISOString(),
					options: {
						locale: opts.locale,
						outDir: opts.outDir,
						skipImages: opts.skipImages,
					},
					imports: shared.manifests,
					imageFailures: shared.imageFailures,
				},
				null,
				2,
			),
		)
		console.log(`Manifest: ${manifestPath}`)

		if (shared.imageFailures.length > 0) {
			const failPath = path.join(opts.outDir, 'cardtrader-import-failures.json')
			await fs.writeFile(failPath, JSON.stringify(shared.imageFailures, null, 2))
			console.log(`Fallos imagen: ${failPath}`)
		}

		if (opts.compile) {
			runCatalogRefresh(opts.compileLangs)
		} else {
			console.log(
				'\nCatálogo en disco actualizado. Compila una sola vez al terminar todos los imports:',
			)
			console.log('  npm run catalog:refresh')
			console.log('  o: node scripts/import-cardtrader-expansion.mjs ... --compile')
		}
	}

	console.log('\nListo.')
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
