#!/usr/bin/env node
/**
 * Añade name.en a cartas data-asia (p. ej. serie M) usando CardTrader blueprints,
 * dexId + pokedex, o jp_card_translations.
 *
 * Usage (from cards-database/):
 *   node scripts/patch-asia-card-english-names.mjs --serie M
 *   node scripts/patch-asia-card-english-names.mjs --sets M1L,M2,M3 --dry-run
 */

import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
	extractCollectorNumber,
	fetchBlueprints,
	fetchPokemonExpansions,
	loadCardTraderToken,
	normalizeBlueprints,
	toLocalId,
} from './lib/cardtrader-client.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')

/** CardTrader expansion id por set TCGdex (serie M). */
const M_EXPANSION_BY_SET = {
	M1L: 4237,
	M1S: 4238,
	M2: 4313,
	M2a: 4314,
	M3: 4433,
	M4: 4497,
}

function parseArgs(argv) {
	const opts = {
		serie: 'M',
		sets: undefined,
		dryRun: false,
		force: false,
		help: false,
	}
	for (let i = 2; i < argv.length; i++) {
		const arg = argv[i]
		if (arg === '--serie' && argv[i + 1]) opts.serie = argv[++i]
		else if (arg === '--sets' && argv[i + 1]) opts.sets = argv[++i].split(',').map((s) => s.trim())
		else if (arg === '--dry-run') opts.dryRun = true
		else if (arg === '--force') opts.force = true
		else if (arg === '--help' || arg === '-h') opts.help = true
	}
	return opts
}

function printHelp() {
	console.log(`patch-asia-card-english-names.mjs

  node scripts/patch-asia-card-english-names.mjs --serie M
  node scripts/patch-asia-card-english-names.mjs --sets M1L,M2 --dry-run

Opciones:
  --serie <folder>   Carpeta bajo data-asia (default: M)
  --sets <id,...>    Solo estos set ids
  --dry-run          Sin escribir archivos
  --force            Reescribir name.en aunque ya exista
`)
}

function esc(str) {
	return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function loadTsNumberMap(filePath) {
	const src = fsSync.readFileSync(filePath, 'utf8')
	const map = new Map()
	for (const m of src.matchAll(/\[(\d+),\s*'((?:\\'|[^'])*)'\]/g)) {
		map.set(Number(m[1]), m[2].replace(/\\'/g, "'"))
	}
	return map
}

function loadTsStringMap(filePath) {
	const src = fsSync.readFileSync(filePath, 'utf8')
	const map = new Map()
	for (const m of src.matchAll(/\['((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)'\]/g)) {
		map.set(m[1].replace(/\\'/g, "'"), m[2].replace(/\\'/g, "'"))
	}
	return map
}

function parseCardFields(source) {
	const jaMatch = source.match(/\bja:\s*["']((?:\\.|[^"'])*)["']/)
	const enMatch = source.match(/\ben:\s*["']((?:\\.|[^"'])*)["']/)
	const dexMatch = source.match(/\bdexId:\s*\[(\d+)/)
	const suffixMatch = source.match(/\bsuffix:\s*["'](\w+)["']/)
	const ctMatch = source.match(/\bcardtrader:\s*(\d+)/)
	const usesDouble = jaMatch ? source.includes(`ja: "${jaMatch[1]}"`) || source.includes(`ja: "${jaMatch[1].replace(/\\'/g, "'")}"`) : source.includes('name: {\n\t\ten: "')
	return {
		ja: jaMatch ? jaMatch[1].replace(/\\'/g, "'") : undefined,
		en: enMatch ? enMatch[1].replace(/\\'/g, "'") : undefined,
		dexId: dexMatch ? Number(dexMatch[1]) : undefined,
		suffix: suffixMatch ? suffixMatch[1] : undefined,
		cardtrader: ctMatch ? Number(ctMatch[1]) : undefined,
		quote: usesDouble ? '"' : "'",
	}
}

function resolveFromJa(jaName, { dexId, suffix }, pokedexMap, translationsMap) {
	if (!jaName) return undefined
	const clean = jaName.replace(/(V-UNION|VSTAR|VMAX|PRO|ex|Ex|GX)$/g, '').trim()
	let base
	if (dexId != null) base = pokedexMap.get(dexId)
	else base = translationsMap.get(clean)
	if (!base) return undefined
	if (jaName.endsWith('V-UNION')) return `${base} V-UNION`
	if (jaName.endsWith('VSTAR')) return `${base} VSTAR`
	if (jaName.endsWith('VMAX')) return `${base} VMAX`
	if (jaName.endsWith('PRO')) return `${base} Pro`
	if (suffix === 'EX' || jaName.endsWith('Ex') || jaName.endsWith('ex')) return `${base} ex`
	if (jaName.endsWith('GX')) return `${base} GX`
	return base
}

function patchNameBlock(source, { en, ja, quote, force }) {
	const q = quote
	const enLit = `${q}${en.replace(/\\/g, '\\\\').replace(q === '"' ? /"/g : /'/g, (c) => `\\${c}`)}${q}`
	const jaLit = ja
		? `${q}${ja.replace(/\\/g, '\\\\').replace(q === '"' ? /"/g : /'/g, (c) => `\\${c}`)}${q}`
		: undefined

	const hasEn = /\ben:\s*/.test(source)
	const hasJa = /\bja:\s*/.test(source)

	if (hasEn && hasJa) {
		let next = source
		const cur = parseCardFields(source)
		const enChanged = force || !cur.en || cur.en === cur.ja
		const jaChanged = ja && cur.ja === cur.en && ja !== cur.en
		if (!enChanged && !jaChanged) return { source, changed: false }
		if (enChanged) {
			next = next.replace(/\ben:\s*["']((?:\\.|[^"'])*)["']/, `en: ${enLit}`)
		}
		if (jaChanged && jaLit) {
			next = next.replace(/\bja:\s*["']((?:\\.|[^"'])*)["']/, `ja: ${jaLit}`)
		}
		return { source: next, changed: next !== source }
	}

	if (hasJa && !hasEn) {
		const next = source.replace(
			/(name:\s*\{\s*\n)(\s*)ja:\s*/,
			`$1$2en: ${enLit},\n$2ja: `,
		)
		return { source: next, changed: next !== source }
	}

	return { source, changed: false }
}

async function loadBlueprintIndexes(token, setIds) {
	const byBlueprintId = new Map()
	const bySetLocalId = new Map()

	for (const setId of setIds) {
		const expansionId = M_EXPANSION_BY_SET[setId]
		if (!expansionId) continue
		console.log(`  Blueprints ${setId} (CT ${expansionId})…`)
		const blueprints = normalizeBlueprints(await fetchBlueprints(token, expansionId))
		for (let i = 0; i < blueprints.length; i++) {
			const bp = blueprints[i]
			const localId = toLocalId(extractCollectorNumber(bp), i + 1)
			const entry = {
				nameEn: (bp.name_en ?? bp.name ?? '').trim(),
				nameJa: (bp.name ?? '').trim(),
				blueprintId: bp.id,
			}
			byBlueprintId.set(bp.id, entry)
			bySetLocalId.set(`${setId}:${localId}`, entry)
		}
		await sleep(800)
	}

	return { byBlueprintId, bySetLocalId }
}

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms))
}

async function main() {
	const opts = parseArgs(process.argv)
	if (opts.help) {
		printHelp()
		return
	}

	const pokedexMap = loadTsNumberMap(path.join(REPO_ROOT, 'scripts/utils-data/pokedex.ts'))
	const translationsMap = loadTsStringMap(
		path.join(REPO_ROOT, 'scripts/utils-data/jp_card_translations.ts'),
	)

	const seriePath = path.join(REPO_ROOT, 'data-asia', opts.serie)
	const setDirs = await fs.readdir(seriePath, { withFileTypes: true })
	let setIds = setDirs.filter((d) => d.isDirectory()).map((d) => d.name)
	if (opts.sets?.length) {
		setIds = setIds.filter((id) => opts.sets.includes(id))
	}

	const token = loadCardTraderToken()
	let blueprintIndexes = { byBlueprintId: new Map(), bySetLocalId: new Map() }
	if (token) {
		blueprintIndexes = await loadBlueprintIndexes(token, setIds)
	} else {
		console.warn('Sin CARDTRADER_API_TOKEN: solo dexId/traducciones JP')
	}

	const stats = { scanned: 0, patched: 0, skipped: 0, unresolved: [] }

	for (const setId of setIds.sort()) {
		const cardsDir = path.join(seriePath, setId)
		const files = (await fs.readdir(cardsDir)).filter((f) => f.endsWith('.ts')).sort()
		for (const file of files) {
			stats.scanned++
			const filePath = path.join(cardsDir, file)
			const source = await fs.readFile(filePath, 'utf8')
			const localId = file.replace(/\.ts$/, '')
			const fields = parseCardFields(source)

			let en
			let ja = fields.ja

			const bpByCt =
				fields.cardtrader != null
					? blueprintIndexes.byBlueprintId.get(fields.cardtrader)
					: undefined
			const bpByNum = blueprintIndexes.bySetLocalId.get(`${setId}:${localId}`)

			const bp = bpByCt ?? bpByNum
			if (bp?.nameEn) en = bp.nameEn
			if (bp?.nameJa && fields.en && fields.ja === fields.en) {
				ja = bp.nameJa
			}

			if (!en) {
				en = resolveFromJa(fields.ja, fields, pokedexMap, translationsMap)
			}

			if (!en) {
				stats.unresolved.push(`${setId}/${localId} (${fields.ja ?? '?'})`)
				stats.skipped++
				continue
			}

			if (fields.en && fields.en !== fields.ja && !opts.force) {
				stats.skipped++
				continue
			}

			const { source: next, changed } = patchNameBlock(source, {
				en,
				ja: ja !== en ? ja : undefined,
				quote: fields.quote,
				force: opts.force,
			})

			if (!changed) {
				stats.skipped++
				continue
			}

			if (!opts.dryRun) {
				await fs.writeFile(filePath, next, 'utf8')
			}
			stats.patched++
		}
	}

	console.log(JSON.stringify(stats, null, 2))
	if (stats.unresolved.length > 0) {
		console.log('\nSin nombre EN resuelto:')
		for (const row of stats.unresolved.slice(0, 40)) console.log(`  ${row}`)
		if (stats.unresolved.length > 40) {
			console.log(`  … y ${stats.unresolved.length - 40} más`)
		}
	}
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
