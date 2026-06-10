import { existsSync, promises as fs } from 'fs'
import path from 'node:path'
import type { SupportedLanguages } from '../../../interfaces.d.ts'
import { Set as SetSingle } from '../../../meta/definitions/api'
import { FileFunction } from '../compilerInterfaces'
import {
	cardsShardPath,
	computeExpansionAggregateHash,
	expansionManifestKey,
	type CompileManifest,
} from '../utils/compileCache'
import { getSeries } from '../utils/serieUtil'

const OUTPUT_DIR = './generated'

interface Stats {
	count: number
	total: number
	images: number
	sets: Record<string, Record<string, { name: string; count: number; images: number }>>
}

async function loadSetMetaShards(lang: SupportedLanguages): Promise<SetSingle[]> {
	const dir = `./generated/${lang}/by-set-meta`
	if (!existsSync(dir)) {
		return []
	}
	const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.json')).sort()
	const sets: SetSingle[] = []
	for (const file of files) {
		sets.push(JSON.parse(await fs.readFile(`${dir}/${file}`, 'utf8')) as SetSingle)
	}
	return sets
}

async function countImagesInCardsShard(lang: SupportedLanguages, setApiId: string): Promise<number> {
	const shardPath = cardsShardPath(lang, setApiId)
	if (!existsSync(shardPath)) {
		return 0
	}
	const cards = JSON.parse(await fs.readFile(shardPath, 'utf8')) as Array<{ image?: string }>
	return cards.reduce((sum, card) => sum + (card.image ? 1 : 0), 0)
}

function maxCardTotal(lSet?: SetSingle, refSet?: SetSingle): number {
	if (!lSet) return refSet!.cardCount.total
	if (!refSet) return lSet.cardCount.total
	return lSet.cardCount.total > refSet.cardCount.total
		? lSet.cardCount.total
		: refSet.cardCount.total
}

async function buildStatsFromShards(lang: SupportedLanguages): Promise<Stats> {
	const referenceLang = ['ja', 'ko', 'zh-tw', 'id', 'th', 'zh-cn'].includes(lang) ? 'ja' : 'en'
	const langSets = await loadSetMetaShards(lang)
	const englishSets = lang === referenceLang ? langSets : await loadSetMetaShards(referenceLang)

	const stats: Stats = {
		count: langSets.reduce((sum, set) => sum + set.cards.length, 0),
		total: langSets.reduce(
			(sum, set) => sum + maxCardTotal(set, englishSets.find((s) => s.id === set.id)),
			0,
		),
		images: 0,
		sets: {},
	}

	const series = await getSeries(lang)
	for (const serie of series) {
		stats.sets[serie.id] = {}
		for (const set of langSets.filter((item) => item.serie.id === serie.id)) {
			const images = await countImagesInCardsShard(lang, set.id)
			stats.sets[serie.id][set.id] = {
				name: set.name,
				count: set.cards.length,
				images,
			}
			stats.images += images
		}
	}

	return stats
}

export async function compileStatsIncremental(
	lang: SupportedLanguages,
	manifest: CompileManifest,
	force: boolean,
): Promise<{ stats: Stats; rebuilt: boolean }> {
	const inputHash = computeExpansionAggregateHash(manifest, lang, 'set')
	const entryKey = expansionManifestKey('__aggregate__', lang, 'stats')
	const outputPath = `${OUTPUT_DIR}/${lang}/stats.json`

	if (!force && manifest.entries[entryKey]?.inputHash === inputHash && existsSync(outputPath)) {
		const stats = JSON.parse(await fs.readFile(outputPath, 'utf8')) as Stats
		return { stats, rebuilt: false }
	}

	const stats = await buildStatsFromShards(lang)
	await fs.mkdir(path.dirname(outputPath), { recursive: true })
	await fs.writeFile(outputPath, JSON.stringify(stats))
	manifest.entries[entryKey] = {
		inputHash,
		compiledAt: new Date().toISOString(),
	}

	return { stats, rebuilt: true }
}

const fn: FileFunction = async (_lang: SupportedLanguages) => {
	throw new Error('stats endpoint must be compiled via compileStatsIncremental()')
}

export default fn
