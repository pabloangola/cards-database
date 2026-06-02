import { existsSync, promises as fs } from 'fs'
import type { SupportedLanguages } from '../../../interfaces.d.ts'
import { Card as CardSingle } from '../../../meta/definitions/api'
import { FileFunction } from '../compilerInterfaces'
import {
	computeSetInputHash,
	listSetSourceBundles,
	manifestKey,
	type CompileManifest,
	type SetSourceBundle,
} from '../utils/compileCache'
import { cardToCardSingle, getCards } from '../utils/cardUtil'
import { getSet } from '../utils/setUtil'
import { loadLastEditsForPaths } from '../utils/util'

const OUTPUT_DIR = './generated'

async function loadExistingCardsBySet(
	lang: SupportedLanguages,
): Promise<Map<string, CardSingle[]>> {
	const outputPath = `${OUTPUT_DIR}/${lang}/cards.json`
	if (!existsSync(outputPath)) {
		return new Map()
	}

	const raw = await fs.readFile(outputPath, 'utf8')
	const cards = JSON.parse(raw) as CardSingle[]
	const bySet = new Map<string, CardSingle[]>()

	for (const card of cards) {
		const setId = card.set.id
		const bucket = bySet.get(setId)
		if (bucket) {
			bucket.push(card)
		} else {
			bySet.set(setId, [card])
		}
	}

	return bySet
}

function bundleSourcePaths(bundle: SetSourceBundle): string[] {
	return [bundle.setFile, bundle.serieFile, ...bundle.cardFiles]
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

export async function compileCardsIncremental(
	lang: SupportedLanguages,
	manifest: CompileManifest,
	force: boolean,
): Promise<{ cards: CardSingle[]; setsCompiled: number; setsSkipped: number }> {
	const bundles = await listSetSourceBundles(lang)
	const existingBySet = force ? new Map<string, CardSingle[]>() : await loadExistingCardsBySet(lang)
	const result: CardSingle[] = []
	const bundlesToCompile: Array<{
		bundle: SetSourceBundle
		inputHash: string
	}> = []
	let setsSkipped = 0

	for (const bundle of bundles) {
		const inputHash = await computeSetInputHash(
			bundle,
			manifest.compilerHash,
			manifest.remoteAssetsHash,
		)
		const key = manifestKey(lang, 'cards', bundle.setId)
		const cachedCards = existingBySet.get(bundle.setId)
		const cacheHit =
			!force &&
			manifest.entries[key]?.inputHash === inputHash &&
			cachedCards &&
			cachedCards.length > 0

		if (cacheHit) {
			result.push(...cachedCards)
			setsSkipped++
			continue
		}

		bundlesToCompile.push({ bundle, inputHash })
	}

	if (bundlesToCompile.length > 0) {
		await loadLastEditsForPaths(
			bundlesToCompile.flatMap(({ bundle }) => bundleSourcePaths(bundle)),
		)
	}

	for (const { bundle, inputHash } of bundlesToCompile) {
		const set = await getSet(bundle.setId, bundle.serieFolder, lang)
		if (!(lang in set.name)) {
			continue
		}

		const cards = await getCards(lang, set)
		const compiled = await Promise.all(
			cards.map(([id, card]) =>
				cardToCardSingle(id, card, lang).catch((e) => {
					console.error('error compiling card', `${card.set.id}-${id}`, e)
					throw e
				}),
			),
		)

		result.push(...compiled)
		manifest.entries[manifestKey(lang, 'cards', bundle.setId)] = {
			inputHash,
			compiledAt: new Date().toISOString(),
		}
	}

	return {
		cards: sortCards(result),
		setsCompiled: bundlesToCompile.length,
		setsSkipped,
	}
}

const fn: FileFunction = async (lang: SupportedLanguages) => {
	throw new Error('cards endpoint must be compiled via compileCardsIncremental()')
}

export default fn
