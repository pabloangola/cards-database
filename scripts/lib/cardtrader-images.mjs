import fs from 'node:fs/promises'
import path from 'node:path'

const DEFAULT_OUT = process.platform === 'win32' ? 'D:\\TcgDex images' : path.join(process.cwd(), 'data', 'tcgdex-images')

export function getDefaultImagesOutDir() {
	return process.env.TCGDEX_LOCAL_IMAGES_DIR?.trim() || DEFAULT_OUT
}

async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function downloadCardTraderImage(token, url, destPath, { force = false, maxAttempts = 3 } = {}) {
	if (!force) {
		try {
			const stat = await fs.stat(destPath)
			if (stat.size > 512) return 'skipped'
		} catch {
			// missing
		}
	}

	await fs.mkdir(path.dirname(destPath), { recursive: true })

	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		try {
			const res = await fetch(url, {
				headers: {
					Accept: 'image/*,*/*',
					Authorization: `Bearer ${token}`,
					'User-Agent': 'dittos-army-cardtrader-importer/1.0',
				},
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
			if (attempt === maxAttempts) throw err
			await sleep(500 * attempt)
		}
	}
	return 'failed'
}

function indexKey(lang, cardId) {
	if (lang === 'en') return cardId
	if (lang === 'ja') return `ja:${cardId}`
	if (lang === 'zh-cn' || lang === 'zh-tw') return `zh:${cardId}`
	return `${lang}:${cardId}`
}

function folderSuffix(lang) {
	if (lang === 'ja') return 'ja'
	if (lang === 'zh-cn' || lang === 'zh-tw') return 'zh'
	return undefined
}

export function resolveImageFolder(setId, lang, englishSetIds, occupiedBaseSetIds) {
	if (lang === 'en') return setId
	const suffix = folderSuffix(lang)
	const needsSuffix = englishSetIds.has(setId) || occupiedBaseSetIds.has(setId)
	return needsSuffix && suffix ? `${setId}-${suffix}` : setId
}

export async function mergeCardIndex(outDir, jobs, dryRun = false) {
	const indexPath = path.join(outDir, 'card-index.json')
	let index = {}
	try {
		index = JSON.parse(await fs.readFile(indexPath, 'utf8'))
	} catch {
		// fresh
	}
	for (const job of jobs) {
		index[indexKey(job.lang, job.cardId)] = {
			lang: job.lang,
			setId: job.setId,
			folder: job.folder,
			name: job.name,
			file: job.dest.replace(/\\/g, '/'),
			source: 'cardtrader',
			cardtraderBlueprintId: job.blueprintId,
		}
	}
	if (!dryRun) {
		await fs.writeFile(indexPath, JSON.stringify(index, null, 2))
	}
	return indexPath
}

export async function loadEnglishSetIdsFromCatalog(repoRoot, lang = 'en') {
	const catalogPath = path.join(repoRoot, 'server', 'generated', lang, 'cards.json')
	try {
		const cards = JSON.parse(await fs.readFile(catalogPath, 'utf8'))
		return new Set(cards.map((c) => c.set?.id).filter(Boolean))
	} catch {
		return new Set()
	}
}

export async function loadOccupiedBaseSetFolders(outDir) {
	const folders = new Set()
	try {
		const entries = await fs.readdir(outDir, { withFileTypes: true })
		for (const entry of entries) {
			if (entry.isDirectory()) {
				folders.add(entry.name.replace(/-(ja|zh)$/, ''))
			}
		}
	} catch {
		// ok
	}
	return folders
}
