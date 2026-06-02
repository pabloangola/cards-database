/**
 * Download TCGdex card images from assets.tcgdex.net
 *
 * Output layout:
 *   English:  {outDir}/{setId}/{cardId}.png
 *   Other:    {outDir}/{setId}-{suffix}/{cardId}.png  when setId exists in EN or folder already taken
 *             {outDir}/{setId}/{cardId}.png           otherwise
 *
 * Requires compiled catalog: server/generated/{lang}/cards.json
 *
 * Usage:
 *   node scripts/download-card-images.mjs
 *   node scripts/download-card-images.mjs --lang ja
 *   node scripts/download-card-images.mjs --langs ja,zh-tw --concurrency 10
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const DEFAULT_OUT = 'D:\\TcgDex images'
const IMAGE_QUALITY = 'high.png'
const MAX_RETRIES = 3

/** Catalog lang code → folder suffix when disambiguation is needed */
const LANG_SUFFIX = {
	ja: 'ja',
	'zh-cn': 'zh',
	'zh-tw': 'zh',
}

function parseArgs(argv) {
	const opts = {
		outDir: DEFAULT_OUT,
		langs: ['en'],
		concurrency: 8,
		limit: Infinity,
		dryRun: false,
		force: false,
	}

	for (let i = 2; i < argv.length; i++) {
		const arg = argv[i]
		if (arg === '--out' && argv[i + 1]) opts.outDir = argv[++i]
		else if (arg === '--lang' && argv[i + 1]) opts.langs = [argv[++i]]
		else if (arg === '--langs' && argv[i + 1]) {
			opts.langs = argv[++i].split(',').map((s) => s.trim()).filter(Boolean)
		} else if (arg === '--concurrency' && argv[i + 1]) {
			opts.concurrency = Math.max(1, parseInt(argv[++i], 10))
		} else if (arg === '--limit' && argv[i + 1]) opts.limit = parseInt(argv[++i], 10)
		else if (arg === '--dry-run') opts.dryRun = true
		else if (arg === '--force') opts.force = true
		else if (arg === '--help') {
			console.log(`Usage: node scripts/download-card-images.mjs [options]

Options:
  --out <dir>          Output directory (default: ${DEFAULT_OUT})
  --lang <code>        Single catalog language (default: en)
  --langs <a,b,c>      Multiple languages, e.g. ja,zh-tw
  --concurrency <n>    Parallel downloads (default: 8)
  --limit <n>          Max cards per language (testing)
  --dry-run            List files without downloading
  --force              Re-download even if file exists
`)
			process.exit(0)
		}
	}

	return opts
}

async function loadJson(filePath) {
	return JSON.parse(await fs.readFile(filePath, 'utf8'))
}

async function loadEnglishSetIds() {
	const catalogPath = path.join(REPO_ROOT, 'server', 'generated', 'en', 'cards.json')
	try {
		const cards = await loadJson(catalogPath)
		return new Set(cards.map((c) => c.set?.id).filter(Boolean))
	} catch {
		return new Set()
	}
}

async function loadExistingSetFolders(outDir) {
	const folders = new Set()
	try {
		const entries = await fs.readdir(outDir, { withFileTypes: true })
		for (const entry of entries) {
			if (entry.isDirectory()) {
				folders.add(entry.name.replace(/-(ja|zh)$/, ''))
			}
		}
	} catch {
		// output dir may not exist yet
	}
	return folders
}

function folderSuffix(lang) {
	return LANG_SUFFIX[lang] ?? lang
}

/**
 * @param {string} setId
 * @param {string} lang
 * @param {Set<string>} englishSetIds
 * @param {Set<string>} occupiedBaseSetIds  setIds that already have a folder without lang suffix
 */
function resolveSetFolder(setId, lang, englishSetIds, occupiedBaseSetIds) {
	if (lang === 'en') return setId

	const suffix = folderSuffix(lang)
	const needsSuffix = englishSetIds.has(setId) || occupiedBaseSetIds.has(setId)
	return needsSuffix ? `${setId}-${suffix}` : setId
}

function buildJobs(cards, lang, englishSetIds, occupiedBaseSetIds) {
	const jobs = []
	const setFolderCache = new Map()

	function getSetFolder(setId) {
		if (setFolderCache.has(setId)) return setFolderCache.get(setId)

		const folder = resolveSetFolder(setId, lang, englishSetIds, occupiedBaseSetIds)
		setFolderCache.set(setId, folder)

		if (folder === setId) {
			occupiedBaseSetIds.add(setId)
		}

		return folder
	}

	for (const card of cards) {
		const setId = card.set?.id
		if (!setId || !card.image || !card.id) continue

		const folder = getSetFolder(setId)

		jobs.push({
			lang,
			setId,
			folder,
			cardId: card.id,
			name: card.name,
			url: `${card.image}/${IMAGE_QUALITY}`,
			dest: path.join(folder, `${card.id}.png`),
		})
	}

	return jobs
}

async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

async function downloadOne(url, destPath, force) {
	if (!force) {
		try {
			const stat = await fs.stat(destPath)
			if (stat.size > 0) return 'skipped'
		} catch {
			// file missing
		}
	}

	await fs.mkdir(path.dirname(destPath), { recursive: true })

	for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
		try {
			const res = await fetch(url, {
				headers: { 'User-Agent': 'dittos-army-tcgdex-downloader/1.0' },
				signal: AbortSignal.timeout(60_000),
			})

			if (!res.ok) throw new Error(`HTTP ${res.status}`)

			const contentType = res.headers.get('content-type') ?? ''
			if (!contentType.includes('image')) {
				throw new Error(`Unexpected content-type: ${contentType}`)
			}

			const buffer = Buffer.from(await res.arrayBuffer())
			if (buffer.length < 512) throw new Error(`File too small (${buffer.length} bytes)`)

			await fs.writeFile(destPath, buffer)
			return 'downloaded'
		} catch (err) {
			if (attempt === MAX_RETRIES) throw err
			await sleep(500 * attempt)
		}
	}

	return 'failed'
}

async function runPool(jobs, outDir, opts, onProgress) {
	let index = 0
	let downloaded = 0
	let skipped = 0
	let failed = 0
	const failures = []

	async function worker() {
		while (true) {
			const i = index++
			if (i >= jobs.length) break

			const job = jobs[i]
			const destPath = path.join(outDir, job.dest)

			if (opts.dryRun) {
				console.log(`[dry-run] [${job.lang}] ${job.url} -> ${destPath}`)
				downloaded++
				onProgress?.()
				continue
			}

			try {
				const result = await downloadOne(job.url, destPath, opts.force)
				if (result === 'skipped') skipped++
				else downloaded++
			} catch (err) {
				failed++
				failures.push({
					lang: job.lang,
					cardId: job.cardId,
					url: job.url,
					dest: job.dest,
					error: err instanceof Error ? err.message : String(err),
				})
			}

			onProgress?.()
		}
	}

	await Promise.all(Array.from({ length: opts.concurrency }, () => worker()))
	return { downloaded, skipped, failed, failures }
}

function indexKey(job) {
	return job.lang === 'en' ? job.cardId : `${folderSuffix(job.lang)}:${job.cardId}`
}

async function mergeCardIndex(outDir, newJobs, dryRun) {
	const indexPath = path.join(outDir, 'card-index.json')
	let index = {}
	try {
		index = await loadJson(indexPath)
	} catch {
		// fresh index
	}

	for (const job of newJobs) {
		index[indexKey(job)] = {
			lang: job.lang,
			setId: job.setId,
			folder: job.folder,
			name: job.name,
			file: job.dest.replace(/\\/g, '/'),
		}
	}

	if (!dryRun) {
		await fs.writeFile(indexPath, JSON.stringify(index, null, 2))
	}
}

async function main() {
	const opts = parseArgs(process.argv)

	const englishSetIds = await loadEnglishSetIds()
	const occupiedBaseSetIds = await loadExistingSetFolders(opts.outDir)

	/** @type {Array<{ lang: string, setId: string, folder: string, cardId: string, name: string, url: string, dest: string }>} */
	let allJobs = []

	for (const lang of opts.langs) {
		const catalogPath = path.join(REPO_ROOT, 'server', 'generated', lang, 'cards.json')
		let cards
		try {
			cards = await loadJson(catalogPath)
		} catch {
			console.warn(`Skipping ${lang}: catalog not found at ${catalogPath}`)
			continue
		}

		const langJobs = buildJobs(cards, lang, englishSetIds, occupiedBaseSetIds)
		const limited =
			Number.isFinite(opts.limit) ? langJobs.slice(0, opts.limit) : langJobs

		console.log(
			`${lang}: ${limited.length} images` +
				` (${langJobs.length} in catalog, suffix "${folderSuffix(lang)}" when needed)`,
		)
		allJobs = allJobs.concat(limited)
	}

	if (allJobs.length === 0) {
		console.error('No jobs to run. Compile catalogs or check --langs.')
		process.exit(1)
	}

	console.log(`English set IDs for disambiguation: ${englishSetIds.size}`)
	console.log(`Output: ${opts.outDir}`)
	console.log(`Concurrency: ${opts.concurrency}`)
	if (opts.dryRun) console.log('Mode: dry-run')
	console.log('')

	await fs.mkdir(opts.outDir, { recursive: true })

	const started = Date.now()
	let done = 0
	const reportEvery = Math.max(1, Math.floor(allJobs.length / 100))

	const { downloaded, skipped, failed, failures } = await runPool(
		allJobs,
		opts.outDir,
		opts,
		() => {
			done++
			if (done % reportEvery === 0 || done === allJobs.length) {
				const pct = ((done / allJobs.length) * 100).toFixed(1)
				const elapsed = ((Date.now() - started) / 1000).toFixed(0)
				process.stdout.write(`\rProgress: ${done}/${allJobs.length} (${pct}%) — ${elapsed}s`)
			}
		},
	)

	console.log('\n')
	console.log('Done.')
	console.log(`  Downloaded: ${downloaded}`)
	console.log(`  Skipped (existing): ${skipped}`)
	console.log(`  Failed: ${failed}`)

	if (failures.length > 0 && !opts.dryRun) {
		const logPath = path.join(opts.outDir, 'download-failures.json')
		await fs.writeFile(logPath, JSON.stringify(failures, null, 2))
		console.log(`  Failures log: ${logPath}`)
	}

	if (!opts.dryRun) {
		await mergeCardIndex(opts.outDir, allJobs, opts.dryRun)

		const manifestPath = path.join(opts.outDir, 'download-manifest.json')
		let manifest = { jobs: [] }
		try {
			manifest = await loadJson(manifestPath)
		} catch {
			// new manifest
		}

		const existingKeys = new Set(
			(manifest.jobs ?? []).map((j) => `${j.lang ?? 'en'}:${j.cardId}`),
		)
		const newEntries = allJobs
			.filter((j) => !existingKeys.has(`${j.lang}:${j.cardId}`))
			.map((j) => ({
				lang: j.lang,
				cardId: j.cardId,
				setId: j.setId,
				folder: j.folder,
				name: j.name,
				file: j.dest.replace(/\\/g, '/'),
				url: j.url,
			}))

		manifest.jobs = [...(manifest.jobs ?? []), ...newEntries]
		manifest.updatedAt = new Date().toISOString()
		manifest.naming = 'tcgdex-id'
		manifest.imageQuality = IMAGE_QUALITY

		await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2))
		console.log(`  Card index: ${path.join(opts.outDir, 'card-index.json')}`)
		console.log(`  Manifest: ${manifestPath} (+${newEntries.length} entries)`)
	}
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
