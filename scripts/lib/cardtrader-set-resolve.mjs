import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '../..')

const SERIE_BY_CODE_PREFIX = [
	['adv', 'ADV'],
	['bw', 'BW'],
	['dp', 'DP'],
	['pt', 'Pt'],
	['l1', 'L'],
	['l2', 'L'],
	['l3', 'L'],
	['ec', 'E'],
	['exp', 'ADV'],
	['neo', 'neo'],
	['xy', 'XY'],
	['sm', 'SM'],
	['sv', 'SV'],
	['s', 'S'],
]

function norm(s) {
	return (s || '').toLowerCase().trim()
}

function getDataRoot(locale) {
	return locale === 'en'
		? path.join(REPO_ROOT, 'data')
		: path.join(REPO_ROOT, 'data-asia')
}

function loadHomologByCardtraderId() {
	const homologPath = path.resolve(REPO_ROOT, '../dittos-army-back/data/cardtrader_tcgdex_homolog.json')
	if (!fs.existsSync(homologPath)) return new Map()
	const parsed = JSON.parse(fs.readFileSync(homologPath, 'utf8'))
	const map = new Map()
	for (const entry of Object.values(parsed.sets ?? {})) {
		const ctId = entry?.cardtrader?.id
		if (typeof ctId === 'number') {
			map.set(ctId, entry)
		}
	}
	return map
}

/** Escanea sets existentes en data / data-asia */
export function scanExistingSets(_locale) {
	const dirs = [
		path.join(REPO_ROOT, 'data'),
		path.join(REPO_ROOT, 'data-asia'),
	]
	const byCardtraderId = new Map()
	const byEnglishName = new Map()

	for (const base of dirs) {
		if (!fs.existsSync(base)) continue
		for (const serieEntry of fs.readdirSync(base, { withFileTypes: true })) {
			if (!serieEntry.isDirectory()) continue
			const serieFolder = serieEntry.name
			const seriePath = path.join(base, serieEntry.name)
			for (const file of fs.readdirSync(seriePath)) {
				if (!file.endsWith('.ts') || file.includes(path.sep)) continue
				const setId = file.replace(/\.ts$/, '')
				const cardsDir = path.join(seriePath, setId)
				const hasCards = fs.existsSync(cardsDir) && fs.statSync(cardsDir).isDirectory()
				const fullPath = path.join(seriePath, file)
				let thirdPartyCt
				let nameEn
				try {
					const src = fs.readFileSync(fullPath, 'utf8')
					const ctMatch = src.match(/cardtrader:\s*(\d+)/)
					if (ctMatch) thirdPartyCt = Number(ctMatch[1])
					const enMatch = src.match(/\ben:\s*'((?:\\'|[^'])*)'/)
					if (enMatch) nameEn = enMatch[1].replace(/\\'/g, "'")
				} catch {
					// ignore
				}
				const record = {
					serieFolder,
					setId,
					setFilePath: fullPath,
					dataRoot: base,
					hasCards,
					nameEn,
					thirdPartyCardtrader: thirdPartyCt,
				}
				if (typeof thirdPartyCt === 'number') byCardtraderId.set(thirdPartyCt, record)
				if (nameEn) byEnglishName.set(norm(nameEn), record)
			}
		}
	}
	return { byCardtraderId, byEnglishName }
}

function guessSerieFolder(expansion) {
	const code = norm(expansion.code)
	if (code.startsWith('csv')) return 'SV'
	if (code.startsWith('csm')) return 'SM'
	if (code.startsWith('cs')) return 'S'
	for (const [prefix, serie] of SERIE_BY_CODE_PREFIX) {
		if (code.startsWith(prefix)) return serie
	}
	return 'CT'
}

function findScannedSet(scanned, { cardtraderId, setId }) {
	if (typeof cardtraderId === 'number') {
		const byCt = scanned.byCardtraderId.get(cardtraderId)
		if (byCt) return byCt
	}
	if (setId) {
		for (const record of scanned.byCardtraderId.values()) {
			if (record.setId === setId) return record
		}
		for (const record of scanned.byEnglishName.values()) {
			if (record.setId === setId) return record
		}
	}
	return undefined
}

function defaultSetId(expansion) {
	const code = expansion.code ?? `ct${expansion.id}`
	return code.replace(/[^a-zA-Z0-9.+-]/g, '').replace(/^(.)/, (m) => m.toUpperCase())
}

/**
 * Resuelve dónde escribir el set importado.
 * @returns {{ serieFolder: string, setId: string, setFilePath: string, dataRoot: string, isNewSet: boolean, locale: string }}
 */
export function resolveSetTarget(expansion, options = {}) {
	const locale = options.locale ?? 'ja'
	const scanned = scanExistingSets(locale)

	// CLI explícito (--set-id / --serie) tiene prioridad sobre homologación automática
	if (options.setId) {
		const setId = options.setId
		const dataRoot = getDataRoot(locale)
		const allHits = [
			...scanned.byEnglishName.values(),
			...scanned.byCardtraderId.values(),
		]
		const hit = allHits.find((s) => s.setId === setId)
		const serieFolder = options.serie ?? hit?.serieFolder ?? guessSerieFolder(expansion)
		const setFilePath =
			hit?.setFilePath ?? path.join(dataRoot, serieFolder, `${setId}.ts`)
		return {
			serieFolder,
			setId,
			setFilePath,
			dataRoot: hit?.dataRoot ?? dataRoot,
			isNewSet: !fs.existsSync(setFilePath),
			locale,
		}
	}

	const homolog = loadHomologByCardtraderId().get(expansion.id)

	if (homolog?.tcgdex_set_id) {
		const loc = homolog.locale ?? locale
		const root = getDataRoot(loc === 'en' ? 'en' : 'ja')
		const hit = findScannedSet(scanned, {
			cardtraderId: expansion.id,
			setId: homolog.tcgdex_set_id,
		})
		if (hit) {
			return {
				serieFolder: hit.serieFolder,
				setId: hit.setId,
				setFilePath: hit.setFilePath,
				dataRoot: hit.dataRoot,
				isNewSet: false,
				locale: loc,
			}
		}
		const serieFolder = guessSerieFolder(expansion)
		const setId = homolog.tcgdex_set_id
		const dataRoot = root
		return {
			serieFolder,
			setId,
			setFilePath: path.join(dataRoot, serieFolder, `${setId}.ts`),
			dataRoot,
			isNewSet: !fs.existsSync(path.join(dataRoot, serieFolder, `${setId}.ts`)),
			locale: loc,
		}
	}

	const byName = scanned.byEnglishName.get(norm(expansion.name))
	if (byName) {
		return {
			serieFolder: byName.serieFolder,
			setId: byName.setId,
			setFilePath: byName.setFilePath,
			dataRoot: byName.dataRoot,
			isNewSet: false,
			locale,
		}
	}

	const byCt = scanned.byCardtraderId.get(expansion.id)
	if (byCt) {
		return { ...byCt, isNewSet: false, locale }
	}

	const serieFolder = options.serie ?? guessSerieFolder(expansion)
	const setId = options.setId ?? defaultSetId(expansion)
	const dataRoot = getDataRoot(locale)
	return {
		serieFolder,
		setId,
		setFilePath: path.join(dataRoot, serieFolder, `${setId}.ts`),
		dataRoot,
		isNewSet: true,
		locale,
	}
}

export function cardsDirFor(target) {
	return path.join(target.dataRoot, target.serieFolder, target.setId)
}
