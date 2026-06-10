import { existsSync, promises as fs } from 'fs'
import path from 'node:path'
import type { SupportedLanguages } from '../../../interfaces.d.ts'
import { Set as SetSingle } from '../../../meta/definitions/api'
import { FileFunction } from '../compilerInterfaces'
import {
	planExpansionBuilds,
	recordExpansionEntry,
	setMetaShardPath,
	type CompileManifest,
	type ExpansionBuildPlan,
} from '../utils/compileCache'
import { resolveCompileConcurrency, runPool } from '../utils/compilePool'
import { getSet, setToSetSingle } from '../utils/setUtil'
import type { CompileLogger } from '../utils/compileLog'
import { loadLastEditsForPaths } from '../utils/util'

const OUTPUT_DIR = './generated'

function bundleSourcePaths(plan: ExpansionBuildPlan): string[] {
	const { bundle } = plan
	return [bundle.setFile, bundle.serieFile, ...bundle.cardFiles]
}

async function readSetMetaShard(lang: SupportedLanguages, setApiId: string): Promise<SetSingle | undefined> {
	const shardPath = setMetaShardPath(lang, setApiId)
	if (!existsSync(shardPath)) {
		return undefined
	}
	return JSON.parse(await fs.readFile(shardPath, 'utf8')) as SetSingle
}

async function writeSetMetaShard(
	lang: SupportedLanguages,
	setApiId: string,
	set: SetSingle,
): Promise<void> {
	const shardPath = setMetaShardPath(lang, setApiId)
	await fs.mkdir(path.dirname(shardPath), { recursive: true })
	await fs.writeFile(shardPath, JSON.stringify(set))
}

async function mergeSetMetaShards(
	lang: SupportedLanguages,
	plans: ExpansionBuildPlan[],
): Promise<SetSingle[]> {
	const shards = await runPool(
		plans,
		(plan) => readSetMetaShard(lang, plan.setApiId),
		resolveCompileConcurrency(),
	)
	return shards
		.filter((set): set is SetSingle => set !== undefined)
		.sort((a, b) => a.id.localeCompare(b.id))
}

export async function compileSetsIncremental(
	lang: SupportedLanguages,
	manifest: CompileManifest,
	force: boolean,
	logger?: CompileLogger,
): Promise<{ sets: SetSingle[]; setsCompiled: number; setsSkipped: number }> {
	const startedAt = Date.now()
	const { toCompile, skipped } = await planExpansionBuilds(lang, manifest, force, 'set')
	const rebuiltIds = toCompile.map((p) => p.setApiId)
	const cachedIds = skipped.map((p) => p.setApiId)

	logger?.expansionPlan(lang, 'sets', rebuiltIds, cachedIds)

	const allPlans = [...skipped, ...toCompile].sort((a, b) =>
		`${a.bundle.serieFolder}/${a.setApiId}`.localeCompare(`${b.bundle.serieFolder}/${b.setApiId}`),
	)

	if (toCompile.length > 0) {
		await loadLastEditsForPaths(toCompile.flatMap(bundleSourcePaths))
	}

	let progressDone = 0
	const compiledSets = await runPool(
		toCompile,
		async (plan) => {
			const set = await getSet(plan.bundle.setId, plan.bundle.serieFolder, lang)
			if (!(lang in set.name)) {
				return { plan, compiled: null as SetSingle | null }
			}

			const compiled = await setToSetSingle(set, lang, { cardFiles: plan.bundle.cardFiles })
			await writeSetMetaShard(lang, plan.setApiId, compiled)
			progressDone++
			logger?.expansionProgress(lang, 'sets', progressDone, toCompile.length, plan.setApiId)
			return { plan, compiled }
		},
		resolveCompileConcurrency(),
	)
	logger?.expansionProgressDone()

	let setsCompiled = 0
	for (const { plan, compiled } of compiledSets) {
		if (!compiled) {
			continue
		}
		recordExpansionEntry(manifest, plan.setApiId, lang, 'set', plan.inputHash)
		setsCompiled++
	}

	const merged = await mergeSetMetaShards(lang, allPlans)
	const outputPath = `${OUTPUT_DIR}/${lang}/sets.json`
	await fs.mkdir(path.dirname(outputPath), { recursive: true })
	await fs.writeFile(outputPath, JSON.stringify(merged))

	logger?.endpointExpansionSummary(lang, 'sets', {
		rebuilt: setsCompiled,
		cached: skipped.length,
		elapsedMs: Date.now() - startedAt,
		extra: `${merged.length} sets`,
	})

	return {
		sets: merged,
		setsCompiled,
		setsSkipped: skipped.length,
	}
}

const fn: FileFunction = async (_lang: SupportedLanguages) => {
	throw new Error('sets endpoint must be compiled via compileSetsIncremental()')
}

export default fn
