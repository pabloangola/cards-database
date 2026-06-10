#!/usr/bin/env node
/**
 * Descarga imágenes CardTrader (secuencial, rate-limited, reanudable).
 *
 * Usage:
 *   node scripts/download-cardtrader-images.mjs --all-manifests
 *   node scripts/download-cardtrader-images.mjs --manifest meta/cardtrader-imports/import-....json
 *
 * Estado persistente:
 *   meta/cardtrader-imports/download-ledger.json   — detalle por carta (reanuda aquí)
 *   meta/cardtrader-imports/download-jobs-cache.json — URLs/jobs (evita re-fetch blueprints)
 *   meta/cardtrader-imports/download-status.json     — resumen ligero
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
	fetchBlueprints,
	fetchPokemonExpansions,
	loadCardTraderToken,
	normalizeBlueprints,
	resolveBlueprintImageUrl,
	toLocalId,
	extractCollectorNumber,
} from './lib/cardtrader-client.mjs'
import {
	downloadCardTraderImage,
	getDefaultImagesOutDir,
	loadEnglishSetIdsFromCatalog,
	loadOccupiedBaseSetFolders,
	mergeCardIndex,
	resolveImageFolder,
} from './lib/cardtrader-images.mjs'
import { resolveSetTarget } from './lib/cardtrader-set-resolve.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const DEFAULT_MANIFESTS_DIR = path.join(REPO_ROOT, 'meta', 'cardtrader-imports')
const STATUS_PATH = path.join(DEFAULT_MANIFESTS_DIR, 'download-status.json')
const JOBS_CACHE_PATH = path.join(DEFAULT_MANIFESTS_DIR, 'download-jobs-cache.json')
const LEDGER_PATH = path.join(DEFAULT_MANIFESTS_DIR, 'download-ledger.json')

function jobKey(job) {
	return `${job.lang}:${job.cardId}`
}

async function writeStatus(payload) {
	await fs.mkdir(DEFAULT_MANIFESTS_DIR, { recursive: true })
	await fs.writeFile(
		STATUS_PATH,
		JSON.stringify({ updatedAt: new Date().toISOString(), ...payload }, null, 2),
	)
}

function parseArgs(argv) {
	const opts = {
		manifest: undefined,
		allManifests: false,
		manifestsDir: DEFAULT_MANIFESTS_DIR,
		expansionId: undefined,
		expansionIds: [],
		locale: 'ja',
		setId: undefined,
		serie: undefined,
		outDir: getDefaultImagesOutDir(),
		rate: 18,
		maxRetries: 3,
		force: false,
		dryRun: false,
		flushEvery: 5,
		refreshJobs: false,
		resetLedger: false,
	}
	for (let i = 2; i < argv.length; i++) {
		const arg = argv[i]
		if (arg === '--manifest' && argv[i + 1]) opts.manifest = argv[++i]
		else if (arg === '--all-manifests') opts.allManifests = true
		else if (arg === '--manifests-dir' && argv[i + 1]) opts.manifestsDir = argv[++i]
		else if (arg === '--expansion-id' && argv[i + 1]) {
			const id = Number(argv[++i])
			opts.expansionId = id
			opts.expansionIds.push(id)
		}
		else if (arg === '--locale' && argv[i + 1]) opts.locale = argv[++i]
		else if (arg === '--set-id' && argv[i + 1]) opts.setId = argv[++i]
		else if (arg === '--serie' && argv[i + 1]) opts.serie = argv[++i]
		else if (arg === '--out' && argv[i + 1]) opts.outDir = argv[++i]
		else if (arg === '--rate' && argv[i + 1]) opts.rate = Number(argv[++i])
		else if (arg === '--max-retries' && argv[i + 1]) opts.maxRetries = Number(argv[++i])
		else if (arg === '--flush-every' && argv[i + 1]) opts.flushEvery = Number(argv[++i])
		else if (arg === '--refresh-jobs') opts.refreshJobs = true
		else if (arg === '--reset-ledger') opts.resetLedger = true
		else if (arg === '--force') opts.force = true
		else if (arg === '--dry-run') opts.dryRun = true
		else if (arg === '--help' || arg === '-h') opts.help = true
	}
	return opts
}

function printHelp() {
	console.log(`CardTrader → imágenes locales (reanudable)

  node scripts/download-cardtrader-images.mjs --all-manifests
  node scripts/download-cardtrader-images.mjs --all-manifests --rate 18

Opciones:
  --all-manifests     Todos los import-*.json
  --rate <n>          Peticiones/segundo (default: 18)
  --max-retries <n>   Reintentos por carta fallida (default: 3)
  --flush-every <n>   Persistir ledger cada N cartas (default: 5)
  --reset-ledger      Ignorar ledger previo y recomputar desde cero
  --refresh-jobs      Regenerar download-jobs-cache.json
  --force             Re-descargar aunque exista PNG

Estado:
  ${LEDGER_PATH}
  ${JOBS_CACHE_PATH}
`)
}

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms))
}

class RateLimiter {
	constructor(maxPerSecond) {
		this.minIntervalMs = 1000 / Math.max(1, maxPerSecond)
		this.lastAt = 0
	}

	async wait() {
		const now = Date.now()
		const waitMs = this.minIntervalMs - (now - this.lastAt)
		if (waitMs > 0) await sleep(waitMs)
		this.lastAt = Date.now()
	}
}

async function fileExistsOk(destPath) {
	try {
		const stat = await fs.stat(destPath)
		return stat.size > 512
	} catch {
		return false
	}
}

function computeSummary(items) {
	const summary = {
		total: 0,
		pending: 0,
		downloading: 0,
		downloaded: 0,
		skipped: 0,
		failed: 0,
		done: 0,
		percent: 0,
	}
	for (const item of Object.values(items)) {
		summary.total++
		summary[item.status] = (summary[item.status] ?? 0) + 1
		if (item.status === 'downloaded' || item.status === 'skipped') summary.done++
	}
	summary.percent = summary.total > 0 ? (summary.done / summary.total) * 100 : 0
	return summary
}

class Ledger {
	constructor(opts) {
		this.opts = opts
		this.path = LEDGER_PATH
		this.data = null
		this.dirty = false
		this.sinceFlush = 0
	}

	async load() {
		if (this.opts.resetLedger) return null
		try {
			const raw = JSON.parse(await fs.readFile(this.path, 'utf8'))
			if (raw?.version === 1 && raw.items) return raw
		} catch {
			// nuevo ledger
		}
		return null
	}

	async init(jobs) {
		const existing = await this.load()
		const items = {}
		const now = new Date().toISOString()

		for (const job of jobs) {
			const key = jobKey(job)
			const prev = existing?.items?.[key]
			if (prev && !this.opts.resetLedger && !this.opts.force) {
				let status = prev.status === 'downloading' ? 'pending' : prev.status
				if (status === 'pending' && (await fileExistsOk(path.join(this.opts.outDir, job.dest)))) {
					status = 'skipped'
				}
				if (status === 'downloaded' || status === 'skipped' || status === 'failed') {
					items[key] = { ...prev, status, dest: job.dest.replace(/\\/g, '/'), url: job.url }
					continue
				}
			}

			let status = 'pending'
			if (!this.opts.force && (await fileExistsOk(path.join(this.opts.outDir, job.dest)))) {
				status = 'skipped'
			}

			items[key] = {
				key,
				cardId: job.cardId,
				lang: job.lang,
				setId: job.setId,
				folder: job.folder,
				name: job.name,
				blueprintId: job.blueprintId,
				expansionId: job.expansionId,
				url: job.url,
				dest: job.dest.replace(/\\/g, '/'),
				status: prev && !this.opts.resetLedger && prev.status === 'failed' ? 'failed' : status,
				attempts: prev?.attempts ?? 0,
				error: prev?.error ?? null,
				updatedAt: prev?.updatedAt ?? now,
			}
		}

		this.data = {
			version: 1,
			startedAt: existing?.startedAt ?? now,
			updatedAt: now,
			outDir: this.opts.outDir,
			options: {
				rate: this.opts.rate,
				maxRetries: this.opts.maxRetries,
				force: this.opts.force,
			},
			phase: existing?.phase ?? 'initial',
			current: null,
			summary: computeSummary(items),
			items,
		}
		await this.flush(true)
	}

	updateItem(key, patch) {
		const item = this.data.items[key]
		if (!item) return
		Object.assign(item, patch, { updatedAt: new Date().toISOString() })
		this.data.summary = computeSummary(this.data.items)
		this.data.updatedAt = new Date().toISOString()
		this.dirty = true
		this.sinceFlush++
	}

	setCurrent(item, index, total) {
		this.data.current = item
			? { key: item.key, cardId: item.cardId, setId: item.setId, index, total }
			: null
		this.dirty = true
	}

	async flush(force = false) {
		if (!this.dirty && !force) return
		if (!force && this.sinceFlush < this.opts.flushEvery) return
		this.data.summary = computeSummary(this.data.items)
		await fs.mkdir(DEFAULT_MANIFESTS_DIR, { recursive: true })
		await fs.writeFile(this.path, JSON.stringify(this.data, null, 2))
		await writeStatus({
			phase: this.data.phase,
			ledger: path.relative(REPO_ROOT, this.path),
			...this.data.summary,
			percent: Number(this.data.summary.percent.toFixed(1)),
			current: this.data.current,
		})
		this.dirty = false
		this.sinceFlush = 0
	}

	getPendingQueue(retryOnly = false) {
		const queue = []
		for (const item of Object.values(this.data.items)) {
			if (retryOnly) {
				if (item.status === 'failed' && item.attempts < this.opts.maxRetries) queue.push(item)
			} else if (item.status === 'pending') {
				queue.push(item)
			}
		}
		return queue
	}

	jobFromItem(item) {
		return {
			lang: item.lang,
			setId: item.setId,
			folder: item.folder,
			cardId: item.cardId,
			name: item.name,
			blueprintId: item.blueprintId,
			expansionId: item.expansionId,
			url: item.url,
			dest: item.dest,
		}
	}
}

function renderProgress(ledger, phase) {
	const s = ledger.data.summary
	const c = ledger.data.current
	const pct = s.percent.toFixed(1)
	const idx = c?.index ?? 0
	const total = c?.total ?? s.total
	const card = c?.cardId ?? '—'
	const line =
		`[${phase}] ${pct}% (${s.done}/${s.total}) ` +
		`| ↓${s.downloaded} skip ${s.skipped} fail ${s.failed} pend ${s.pending} ` +
		`| ${idx}/${total} ${card}`
	process.stdout.write(`\r${line.slice(0, 120).padEnd(120)}`)
}

async function loadManifestEntries(opts) {
	const entries = []
	if (opts.manifest) {
		const raw = JSON.parse(await fs.readFile(path.resolve(opts.manifest), 'utf8'))
		entries.push(...(raw.imports ?? []))
	} else if (opts.allManifests) {
		const dir = path.resolve(opts.manifestsDir)
		const files = (await fs.readdir(dir))
			.filter((f) => f.startsWith('import-') && f.endsWith('.json'))
			.sort()
		for (const file of files) {
			const raw = JSON.parse(await fs.readFile(path.join(dir, file), 'utf8'))
			entries.push(...(raw.imports ?? []))
		}
	}
	return entries
}

function dedupeManifestEntries(entries) {
	const byExpansion = new Map()
	for (const entry of entries) {
		const id = entry.cardtrader?.id
		if (!id) continue
		const locale = entry.tcgdex?.locale ?? 'ja'
		const key = `${id}:${locale}:${entry.tcgdex?.setId ?? ''}`
		if (!byExpansion.has(key)) byExpansion.set(key, entry)
	}
	return [...byExpansion.values()]
}

async function jobsFromExpansion(ctx, expansionId, locale, setIdOverride, serieOverride) {
	const expansion = ctx.expansionsById.get(expansionId)
	if (!expansion) {
		console.warn(`  Expansión ${expansionId} no encontrada en CardTrader`)
		return []
	}

	const target = resolveSetTarget(expansion, {
		locale,
		setId: setIdOverride,
		serie: serieOverride,
	})
	let blueprints = ctx.blueprintCache.get(expansionId)
	if (!blueprints) {
		console.log(`  Blueprints expansión ${expansionId} (${expansion.name})…`)
		blueprints = normalizeBlueprints(await fetchBlueprints(ctx.token, expansionId))
		ctx.blueprintCache.set(expansionId, blueprints)
		await writeStatus({
			phase: 'collecting-blueprints',
			expansionId,
			expansionName: expansion.name,
			cachedExpansions: ctx.blueprintCache.size,
		})
		await sleep(ctx.blueprintDelayMs)
	}

	const folder = resolveImageFolder(target.setId, locale, ctx.englishSetIds, ctx.occupied)
	if (folder === target.setId) ctx.occupied.add(target.setId)

	const jobs = []
	for (let i = 0; i < blueprints.length; i++) {
		const bp = blueprints[i]
		const localId = toLocalId(extractCollectorNumber(bp), i + 1)
		const url = resolveBlueprintImageUrl(bp)
		if (!url) continue
		const tcgCardId = `${target.setId}-${localId}`
		jobs.push({
			lang: locale,
			setId: target.setId,
			folder,
			cardId: tcgCardId,
			name: bp.name_en ?? bp.name,
			blueprintId: bp.id,
			expansionId,
			url,
			dest: path.join(folder, `${tcgCardId}.png`),
		})
	}
	return jobs
}

async function collectJobs(opts, token) {
	const allExpansions = await fetchPokemonExpansions(token)
	const ctx = {
		token,
		expansionsById: new Map(allExpansions.map((e) => [e.id, e])),
		blueprintCache: new Map(),
		englishSetIds: await loadEnglishSetIdsFromCatalog(REPO_ROOT, 'en'),
		occupied: await loadOccupiedBaseSetFolders(opts.outDir),
		blueprintDelayMs: 3500,
	}

	let jobs = []
	if (opts.expansionIds.length > 0) {
		for (const expansionId of opts.expansionIds) {
			jobs = jobs.concat(
				await jobsFromExpansion(ctx, expansionId, opts.locale, opts.setId, opts.serie),
			)
		}
	} else {
		const entries = dedupeManifestEntries(await loadManifestEntries(opts))
		console.log(`Manifests: ${entries.length} expansión(es) únicas`)
		for (const entry of entries) {
			const id = entry.cardtrader.id
			const locale = entry.tcgdex?.locale ?? opts.locale
			const setId = entry.tcgdex?.setId
			jobs = jobs.concat(await jobsFromExpansion(ctx, id, locale, setId, undefined))
		}
	}

	const seen = new Set()
	return jobs.filter((j) => {
		const key = jobKey(j)
		if (seen.has(key)) return false
		seen.add(key)
		return true
	})
}

async function loadJobsCache() {
	try {
		const raw = JSON.parse(await fs.readFile(JOBS_CACHE_PATH, 'utf8'))
		if (!Array.isArray(raw.jobs) || raw.jobs.length === 0) return null
		return raw.jobs
	} catch {
		return null
	}
}

async function saveJobsCache(jobs) {
	await fs.mkdir(DEFAULT_MANIFESTS_DIR, { recursive: true })
	await fs.writeFile(
		JOBS_CACHE_PATH,
		JSON.stringify({ generatedAt: new Date().toISOString(), count: jobs.length, jobs }, null, 2),
	)
}

async function resolveJobs(opts, token) {
	if (opts.allManifests && !opts.refreshJobs && !opts.expansionId && !opts.manifest) {
		const cached = await loadJobsCache()
		if (cached) {
			console.log(`Jobs desde caché: ${path.relative(REPO_ROOT, JOBS_CACHE_PATH)} (${cached.length})`)
			return cached
		}
	}
	const jobs = await collectJobs(opts, token)
	if (opts.allManifests && jobs.length > 0) {
		await saveJobsCache(jobs)
		console.log(`Jobs cacheados: ${path.relative(REPO_ROOT, JOBS_CACHE_PATH)}`)
	}
	return jobs
}

async function processQueue(ledger, queue, opts, token, limiter, phase, succeededJobs) {
	const total = ledger.data.summary.total
	let processed = 0

	for (const item of queue) {
		processed++
		ledger.setCurrent(item, ledger.data.summary.done + 1, total)
		ledger.updateItem(item.key, { status: 'downloading', error: null })
		renderProgress(ledger, phase)
		await ledger.flush(true)

		await limiter.wait()
		const destPath = path.join(opts.outDir, item.dest)
		try {
			const result = await downloadCardTraderImage(token, item.url, destPath, {
				force: opts.force,
				maxAttempts: 1,
			})
			if (result === 'skipped') {
				ledger.updateItem(item.key, { status: 'skipped' })
				succeededJobs.push(ledger.jobFromItem(item))
			} else {
				ledger.updateItem(item.key, { status: 'downloaded' })
				succeededJobs.push(ledger.jobFromItem(item))
			}
		} catch (err) {
			const attempts = (item.attempts ?? 0) + 1
			ledger.updateItem(item.key, {
				status: 'failed',
				attempts,
				error: err instanceof Error ? err.message : String(err),
			})
		}

		renderProgress(ledger, phase)
		await ledger.flush()
	}

	ledger.setCurrent(null, 0, total)
	await ledger.flush(true)
	process.stdout.write('\n')
}

async function main() {
	const opts = parseArgs(process.argv)
	if (opts.help) {
		printHelp()
		process.exit(0)
	}

	const token = loadCardTraderToken()
	if (!token) {
		console.error('Falta CARDTRADER_API_TOKEN')
		process.exit(1)
	}

	if (!opts.manifest && !opts.allManifests && opts.expansionIds.length === 0) {
		printHelp()
		process.exit(1)
	}

	const ledger = new Ledger(opts)
	let shuttingDown = false

	const onSignal = async () => {
		if (shuttingDown) return
		shuttingDown = true
		process.stdout.write('\n\nInterrupción: guardando ledger…\n')
		await ledger.flush(true)
		process.exit(130)
	}
	process.on('SIGINT', onSignal)
	process.on('SIGTERM', onSignal)

	console.log(`CardTrader imágenes | rate=${opts.rate}/s | out=${opts.outDir}`)
	console.log(`Ledger: ${LEDGER_PATH}`)

	const jobs = await resolveJobs(opts, token)
	console.log(`${jobs.length} imágenes en cola`)
	await ledger.init(jobs)

	const s0 = ledger.data.summary
	console.log(
		`Estado inicial: ${s0.percent.toFixed(1)}% | ↓${s0.downloaded} skip ${s0.skipped} fail ${s0.failed} pend ${s0.pending}`,
	)

	if (opts.dryRun) {
		console.log('Dry-run: primeras 5 pendientes:')
		ledger.getPendingQueue().slice(0, 5).forEach((i) => console.log(`  ${i.cardId} → ${i.dest}`))
		return
	}

	await fs.mkdir(opts.outDir, { recursive: true })
	const limiter = new RateLimiter(opts.rate)
	const succeededJobs = []

	ledger.data.phase = 'initial'
	const pending = ledger.getPendingQueue(false)
	if (pending.length > 0) {
		console.log(`\n--- Pasada inicial (${pending.length} pendientes) ---`)
		await processQueue(ledger, pending, opts, token, limiter, 'inicial', succeededJobs)
	}

	for (let round = 1; round <= opts.maxRetries; round++) {
		const retryQueue = ledger.getPendingQueue(true)
		if (retryQueue.length === 0) break
		ledger.data.phase = `retry-${round}`
		console.log(`\n--- Reintento ${round}/${opts.maxRetries} (${retryQueue.length} fallidas) ---`)
		for (const item of retryQueue) {
			ledger.updateItem(item.key, { status: 'pending' })
		}
		await ledger.flush(true)
		await processQueue(ledger, retryQueue, opts, token, limiter, `retry-${round}`, succeededJobs)
	}

	const final = ledger.data.summary
	const failures = Object.values(ledger.data.items).filter((i) => i.status === 'failed')

	if (succeededJobs.length > 0) {
		const allSucceeded = Object.values(ledger.data.items)
			.filter((i) => i.status === 'downloaded' || i.status === 'skipped')
			.map((i) => ledger.jobFromItem(i))
		const indexPath = await mergeCardIndex(opts.outDir, allSucceeded, false)
		console.log(`Índice actualizado: ${indexPath} (${allSucceeded.length} entradas)`)
	}

	if (failures.length > 0) {
		const failPath = path.join(opts.outDir, 'cardtrader-download-failures.json')
		await fs.writeFile(failPath, JSON.stringify(failures, null, 2))
		console.log(`Fallos persistentes: ${failPath}`)
	}

	ledger.data.phase = 'completed'
	ledger.data.current = null
	await ledger.flush(true)

	console.log(
		`\nFinal: ${final.percent.toFixed(1)}% | ↓${final.downloaded} descargadas | ${final.skipped} omitidas | ${failures.length} fallidas`,
	)
	console.log(`Ledger: ${LEDGER_PATH}`)
}

main().catch(async (err) => {
	console.error(err)
	process.exit(1)
})
