import { existsSync, promises as fs } from 'fs'
import path from 'node:path'
import type { SupportedLanguages } from '../../../interfaces.d.ts'
import { Card as CardSingle } from '../../../meta/definitions/api'
import { FileFunction } from '../compilerInterfaces'
import {
	cardsShardPath,
	planExpansionBuilds,
	recordExpansionEntry,
	type CompileManifest,
	type ExpansionBuildPlan,
} from '../utils/compileCache'
import { resolveCompileConcurrency, runPool } from '../utils/compilePool'
import { getCardsFromPaths, cardToCardSingle } from '../utils/cardUtil'
import { clearSetResumeCache, getSet, setToSetSimpleFast } from '../utils/setUtil'
import type { CompileLogger } from '../utils/compileLog'
import { loadLastEditsForPaths } from '../utils/util'

const OUTPUT_DIR = './generated'
const CARD_IMPORT_CONCURRENCY = Math.max(
	4,
	Number(process.env.COMPILE_CARD_IMPORT_CONCURRENCY) || 16,
)

function bundleSourcePaths(plan: ExpansionBuildPlan): string[] {
	const { bundle } = plan
	return [bundle.setFile, bundle.serieFile, ...bundle.cardFiles]
}

async function readCardsShard(lang: SupportedLanguages, setApiId: string): Promise<CardSingle[]> {
	const shardPath = cardsShardPath(lang, setApiId)
	if (!existsSync(shardPath)) {
		return []
	}
	return JSON.parse(await fs.readFile(shardPath, 'utf8')) as CardSingle[]
}

async function writeCardsShard(
	lang: SupportedLanguages,
	setApiId: string,
	cards: CardSingle[],
): Promise<void> {
	const shardPath = cardsShardPath(lang, setApiId)
	await fs.mkdir(path.dirname(shardPath), { recursive: true })
	await fs.writeFile(shardPath, JSON.stringify(cards))
}

function sortCards(cards: CardSingle[]): CardSingle[] {
	return cards.sort((a, b) => {
		const setCmp = a.set.id.localeCompare(b.set.id)
		if (setCmp !== 0) {
			return setCmp
		}
		const ra = parseInt(a.localId, 10)
		const rb = parseInt(b.localId, 10)
		if (!isNaN(ra) && !isNaN(rb)) {
			return ra - rb
		}
		return a.localId >= b.localId ? 1 : -1
	})
}

async function mergeCardShards(
	lang: SupportedLanguages,
	plans: ExpansionBuildPlan[],
): Promise<CardSingle[]> {
	const shards = await runPool(
		plans,
		(plan) => readCardsShard(lang, plan.setApiId),
		resolveCompileConcurrency(),
	)
	return sortCards(shards.flat())
}

async function compileExpansionCards(
	lang: SupportedLanguages,
	plan: ExpansionBuildPlan,
): Promise<CardSingle[]> {
	const set = await getSet(plan.bundle.setId, plan.bundle.serieFolder, lang)
	if (!(lang in set.name)) {
		return []
	}

	const cards = await getCardsFromPaths(
		lang,
		set,
		plan.bundle.cardFiles,
		CARD_IMPORT_CONCURRENCY,
	)
	const setResume = await setToSetSimpleFast(set, lang, cards.length)
	const compileContext = { setResume }

	return runPool(
		cards,
		([id, card]) =>
			cardToCardSingle(id, card, lang, compileContext).catch((e) => {
				console.error('error compiling card', `${card.set.id}-${id}`, e)
				throw e
			}),
		CARD_IMPORT_CONCURRENCY,
	)
}

export async function compileCardsIncremental(
	lang: SupportedLanguages,
	manifest: CompileManifest,
	force: boolean,
	logger?: CompileLogger,
): Promise<{ cards: CardSingle[]; setsCompiled: number; setsSkipped: number }> {
	clearSetResumeCache()
	const startedAt = Date.now()

	const { toCompile, skipped } = await planExpansionBuilds(lang, manifest, force, 'cards')
	const rebuiltIds = toCompile.map((p) => p.setApiId)
	const cachedIds = skipped.map((p) => p.setApiId)

	logger?.expansionPlan(lang, 'cards', rebuiltIds, cachedIds)

	const allPlans = [...skipped, ...toCompile].sort((a, b) =>
		`${a.bundle.serieFolder}/${a.setApiId}`.localeCompare(`${b.bundle.serieFolder}/${b.setApiId}`),
	)

	if (toCompile.length > 0) {
		await loadLastEditsForPaths(toCompile.flatMap(bundleSourcePaths))
	}

	const concurrency = resolveCompileConcurrency()
	let progressDone = 0
	const compiledSets = await runPool(
		toCompile,
		async (plan) => {
			const compiled = await compileExpansionCards(lang, plan)
			if (compiled.length === 0) {
				return { plan, compiled: null as CardSingle[] | null }
			}
			await writeCardsShard(lang, plan.setApiId, compiled)
			progressDone++
			logger?.expansionProgress(lang, 'cards', progressDone, toCompile.length, plan.setApiId)
			return { plan, compiled }
		},
		concurrency,
	)
	logger?.expansionProgressDone()

	let setsCompiled = 0
	for (const { plan, compiled } of compiledSets) {
		if (!compiled || compiled.length === 0) {
			continue
		}
		recordExpansionEntry(manifest, plan.setApiId, lang, 'cards', plan.inputHash)
		setsCompiled++
	}

	const merged = await mergeCardShards(lang, allPlans)
	const outputPath = `${OUTPUT_DIR}/${lang}/cards.json`
	await fs.mkdir(path.dirname(outputPath), { recursive: true })
	await fs.writeFile(outputPath, JSON.stringify(merged))

	logger?.endpointExpansionSummary(lang, 'cards', {
		rebuilt: setsCompiled,
		cached: skipped.length,
		elapsedMs: Date.now() - startedAt,
		extra: `${merged.length.toLocaleString('es')} cartas`,
	})

	return {
		cards: merged,
		setsCompiled,
		setsSkipped: skipped.length,
	}
}

const fn: FileFunction = async (lang: SupportedLanguages) => {
	throw new Error('cards endpoint must be compiled via compileCardsIncremental()')
}

export default fn
