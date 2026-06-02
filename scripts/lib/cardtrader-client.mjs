import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '../..')
const DEFAULT_BASE = 'https://api.cardtrader.com/api/v2'
const POKEMON_GAME_ID = 5
const REQUEST_TIMEOUT_MS = 60_000

/** Carga CARDTRADER_API_TOKEN desde env o dittos-army-back/.env */
export function loadCardTraderToken() {
	if (process.env.CARDTRADER_API_TOKEN?.trim()) {
		return process.env.CARDTRADER_API_TOKEN.trim()
	}
	const envPath = path.resolve(REPO_ROOT, '../dittos-army-back/.env')
	if (!fs.existsSync(envPath)) return undefined
	for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
		const trimmed = line.trim()
		if (!trimmed || trimmed.startsWith('#')) continue
		const eq = trimmed.indexOf('=')
		if (eq <= 0) continue
		const key = trimmed.slice(0, eq).trim()
		let val = trimmed.slice(eq + 1).trim()
		if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
			val = val.slice(1, -1)
		}
		if (key === 'CARDTRADER_API_TOKEN' && val) return val
	}
	return undefined
}

export async function cardTraderFetch(token, apiPath, query = {}) {
	const url = new URL(`${DEFAULT_BASE}/${apiPath.replace(/^\//, '')}`)
	for (const [k, v] of Object.entries(query)) {
		if (v !== undefined && v !== '') url.searchParams.set(k, String(v))
	}
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
		},
		signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
	})
	const text = await res.text()
	let body
	try {
		body = text ? JSON.parse(text) : undefined
	} catch {
		body = text
	}
	if (!res.ok) {
		const msg =
			typeof body === 'object' && body?.error ? body.error : `HTTP ${res.status} ${url.pathname}`
		throw new Error(`CardTrader ${msg}`)
	}
	return body
}

export async function fetchPokemonExpansions(token) {
	const raw = await cardTraderFetch(token, 'expansions')
	if (!Array.isArray(raw)) return []
	return raw.filter((e) => e?.game_id === POKEMON_GAME_ID)
}

export async function fetchBlueprints(token, expansionId) {
	const raw = await cardTraderFetch(token, 'blueprints/export', {
		expansion_id: expansionId,
	})
	return Array.isArray(raw) ? raw : []
}

export function normalizeBlueprints(data) {
	if (!Array.isArray(data)) return []
	return data.filter((x) => x && typeof x === 'object' && typeof x.id === 'number')
}

export function extractBlueprintRarity(blueprint) {
	const fixed = blueprint?.fixed_properties
	if (!fixed || typeof fixed !== 'object') return undefined
	return fixed.pokemon_rarity ?? fixed.rarity ?? fixed.mtg_rarity ?? undefined
}

export function extractCollectorNumber(blueprint) {
	const raw = blueprint?.fixed_properties?.collector_number
	if (typeof raw !== 'string' || !raw.trim()) return undefined
	return raw.trim()
}

/** URL de imagen CardTrader (preferir show sobre preview). */
export function resolveBlueprintImageUrl(blueprint) {
	const img = blueprint?.image
	if (img && typeof img === 'object') {
		const show = img.show?.url ?? img.url
		if (typeof show === 'string' && show.trim()) {
			return absolutizeCardTraderUrl(show)
		}
	}
	let url = blueprint?.image_url
	if (typeof url !== 'string' || !url.trim()) return undefined
	url = url.trim()
	if (url.includes('/preview_')) {
		url = url.replace('/preview_', '/show_')
	}
	return absolutizeCardTraderUrl(url)
}

export function absolutizeCardTraderUrl(url) {
	if (!url) return undefined
	if (url.startsWith('http://') || url.startsWith('https://')) return url
	if (url.startsWith('//')) return `https:${url}`
	return `https://www.cardtrader.com${url.startsWith('/') ? '' : '/'}${url}`
}

export function inferCategory(blueprint) {
	const name = `${blueprint?.name_en ?? blueprint?.name ?? ''}`.toLowerCase()
	if (/\benergy\b/.test(name)) return 'Energy'
	if (/\b(trainer|supporter|stadium|tool|item)\b/.test(name)) return 'Trainer'
	return 'Pokemon'
}

export function toLocalId(collectorNumber, fallbackIndex) {
	if (collectorNumber) {
		const cleaned = collectorNumber.replace(/[^\w.-]/g, '_')
		if (/^\d+$/.test(collectorNumber)) {
			return collectorNumber.padStart(3, '0')
		}
		return cleaned
	}
	return String(fallbackIndex).padStart(3, '0')
}
