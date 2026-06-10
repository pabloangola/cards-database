import pathLib from 'node:path'
import type { Card, Set, SupportedLanguages } from '../../../interfaces.d.ts'
import { runPool } from './compilePool'
import { DB_PATH, getDataFolder, smartGlob } from './util'

export async function getCard(set: Set, id: string, lang: SupportedLanguages): Promise<Card> {
	try {
		return (await import(`../../${DB_PATH}/${getDataFolder(lang)}/${set.serie.name.en ?? set.serie.name[lang]}/${set.name.en ?? set.name[lang]}/${id}.ts`)).default
	} catch {
		return (await import(`../../${DB_PATH}/${getDataFolder(lang)}/${set.serie.id}/${set.id}/${id}.ts`)).default
	}
}

function sortCardEntries(list: Array<[string, Card]>): Array<[string, Card]> {
	return list.sort(([a], [b]) => {
		const ra = parseInt(a, 10)
		const rb = parseInt(b, 10)
		if (!isNaN(ra) && !isNaN(rb)) {
			return ra - rb
		}
		return a >= b ? 1 : -1
	})
}

/** Load cards from known paths (parallel dynamic imports). */
export async function getCardsFromPaths(
	lang: SupportedLanguages,
	set: Set,
	cardFiles: string[],
	concurrency = 12,
): Promise<Array<[string, Card]>> {
	if (!(lang in set.name)) {
		return []
	}

	const loaded = await runPool(
		cardFiles,
		async (cardPath) => {
			const id = pathLib.basename(cardPath, '.ts')
			try {
				const c = await getCard(set, id, lang)
				if (!c.name[lang]) {
					return undefined
				}
				return [id, c] as [string, Card]
			} catch {
				return undefined
			}
		},
		concurrency,
	)

	return sortCardEntries(loaded.filter((entry): entry is [string, Card] => entry !== undefined))
}

export async function getCards(lang: SupportedLanguages, set?: Set): Promise<Array<[string, Card]>> {
	let cards = await smartGlob(`${DB_PATH}/${getDataFolder(lang)}/${(set && (set.serie.name.en ?? set.serie.name[lang])) ?? '*'}/${(set && (set.name.en ?? set.name[lang])) ?? '*'}/*.ts`)
	if (cards.length === 0) {
		cards = await smartGlob(`${DB_PATH}/${getDataFolder(lang)}/${(set && set.serie.id) ?? '*'}/${(set && set.id) ?? '*'}/*.ts`)
	}
	if (set) {
		return getCardsFromPaths(lang, set, cards)
	}

	const { getSet } = await import('./setUtil')
	const list: Array<[string, Card]> = []
	for (const cardPath of cards) {
		let items = cardPath.split(pathLib.sep)
		items = items.slice(items.length - 3)

		let id = items[2]
		id = id.substring(0, id.lastIndexOf('.'))

		const setName = items[1]
		const serieName = items[0]
		const resolvedSet = await getSet(setName, serieName, lang)

		if (!(lang in resolvedSet.name)) {
			continue
		}

		const c = await getCard(resolvedSet, id, lang)
		if (!c.name[lang]) {
			continue
		}
		list.push([id, c])
	}

	return sortCardEntries(list)
}
