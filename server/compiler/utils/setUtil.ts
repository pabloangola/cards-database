import { objectKeys, objectMap } from '@dzeio/object-util'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import type { Card, Set, SupportedLanguages } from '../../../interfaces.d.ts'
import { SetResume, Set as SetSingle } from '../../../meta/definitions/api'
import { cardToCardSimple } from './cardUtil'
import { getCards, getCardsFromPaths } from './cardLoader'
import { dedupeSetCandidates } from './setDedupe'
import { setPictureUrls } from './remoteDatas'
import { DB_PATH, getDataFolder, resolveText, setIsLegal, smartGlob } from './util'


interface t {
	[key: string]: Set
}

const setCache: t = {}

let englishLabelsBySetId: Record<string, string> | null = null

function loadEnglishLabelsBySetId(): Record<string, string> {
	if (englishLabelsBySetId) {
		return englishLabelsBySetId
	}
	try {
		const raw = readFileSync(`${DB_PATH}/meta/set-english-labels.json`, 'utf8')
		const parsed = JSON.parse(raw) as { bySetId?: Record<string, string> }
		englishLabelsBySetId = parsed.bySetId ?? {}
	} catch {
		englishLabelsBySetId = {}
	}
	return englishLabelsBySetId
}

export function isSetAvailable(set: Set, lang: SupportedLanguages): boolean {
	return !!resolveText(set.name, lang) && !!resolveText(set.serie.name, lang)
}

/**
 * Return the set
 * @param name the name of the set
 */
export async function getSet(name: string, serie = '*', lang: SupportedLanguages): Promise<Set> {
	if (!setCache[name]) {
		const file = `${DB_PATH}/${getDataFolder(lang)}/${serie}/${name}.ts`
		try {
			const [path] = await smartGlob(file)
			// console.log(`${DB_PATH}/${getDataFolder(lang)}/${serie}/${name}.ts`)
			setCache[name] = (await import(`../../${path}`)).default
		} catch (error) {
			console.error(error)
			console.error(`Error trying to import importing (${file})`)
			process.exit(1)
		}
	}
	return setCache[name]
}

function compareReleaseDate(a: Set, b: Set): number {
	const dateA = typeof a.releaseDate === 'object'
		? a.releaseDate[objectKeys(a.releaseDate)[0]]!
		: a.releaseDate
	const dateB = typeof b.releaseDate === 'object'
		? b.releaseDate[objectKeys(b.releaseDate)[0]]!
		: b.releaseDate
	return dateA > dateB ? 1 : -1
}

// Dont use cache as it wont necessary have them all
export async function getSets(serie = '*', lang: SupportedLanguages): Promise<Array<Set>> {
	const rawPaths = (await smartGlob(`${DB_PATH}/${getDataFolder(lang)}/${serie}/*.ts`))
		.map((it) => it.replaceAll(path.sep, '/'))

	const candidates: Array<{
		set: Set
		canonicalId: string
		fileBase: string
		cardFileCount: number
	}> = []

	for (const filePath of rawPaths) {
		const fileBase = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
		const set = await getSet(fileBase, serie, lang)
		if (!isSetAvailable(set, lang)) {
			continue
		}
		const serieFolder = filePath.split('/').slice(-2, -1)[0]
		const cardFiles = await smartGlob(`${DB_PATH}/${getDataFolder(lang)}/${serieFolder}/${fileBase}/*.ts`)
		candidates.push({
			set,
			canonicalId: set.id,
			fileBase,
			cardFileCount: cardFiles.length,
		})
	}

	return dedupeSetCandidates(candidates)
		.map((candidate) => candidate.set)
		.sort(compareReleaseDate)
}

export async function getSetPictures(set: Set, lang: SupportedLanguages): Promise<[string | undefined, string | undefined]> {
	return setPictureUrls(set, lang)
}

const setResumeCache = new Map<string, SetResume>()

export async function setToSetSimpleFast(
	set: Set,
	lang: SupportedLanguages,
	cardCount: number,
): Promise<SetResume> {
	const cacheKey = `${lang}:${set.id}`
	const cached = setResumeCache.get(cacheKey)
	if (cached) {
		return cached
	}

	const pics = setPictureUrls(set, lang)
	const englishName = resolveEnglishName(set, lang)
	const resume: SetResume = {
		cardCount: {
			official: set.cardCount.official,
			total: Math.max(set.cardCount.official, cardCount),
		},
		id: set.id,
		logo: pics[0],
		name: resolveText(set.name, lang),
		...(englishName ? { englishName } : {}),
		symbol: pics[1],
	}
	setResumeCache.set(cacheKey, resume)
	return resume
}

export function clearSetResumeCache(): void {
	setResumeCache.clear()
}

function resolveEnglishName(set: Set, lang: SupportedLanguages): string | undefined {
	if (lang === 'en') {
		return undefined
	}
	const fromSet = resolveText(set.name, 'en')
	if (fromSet) {
		return fromSet
	}
	const labels = loadEnglishLabelsBySetId()
	return labels[set.id] ?? labels[set.id.toUpperCase()] ?? labels[set.id.toLowerCase()]
}

export async function setToSetSimple(set: Set, lang: SupportedLanguages): Promise<SetResume> {
	const cards = await getCards(lang, set)
	const pics = await getSetPictures(set, lang)
	const englishName = resolveEnglishName(set, lang)
	return {
		cardCount: {
			official: set.cardCount.official,
			total: Math.max(set.cardCount.official, cards.length)
		},
		id: set.id,
		logo: pics[0],
		name: resolveText(set.name, lang),
		...(englishName ? { englishName } : {}),
		symbol: pics[1]
	}
}

function getVariantCountForType(card: Card, type: 'normal' | 'reverse' | 'holo' | 'firstEdition'): number {
	if( card.variants === undefined || card.variants === null) {
		return 0;
	}

	if (!Array.isArray(card.variants)) {
		return card.variants[type] ? 1 : 0;
	}

	if (type === 'firstEdition') {
		return card.variants.reduce((count, variant) =>
			count + (variant.stamp?.some((stamp) => stamp === '1st-edition') ? 1 : 0), 0);
	}

	return card.variants.reduce((count, variant) => count + (variant.type === type ? 1 : 0), 0);
}


export async function setToSetSingle(
	set: Set,
	lang: SupportedLanguages,
	options?: { cardFiles?: string[] },
): Promise<SetSingle> {
	const cards = options?.cardFiles?.length
		? await getCardsFromPaths(lang, set, options.cardFiles)
		: await getCards(lang, set)
	const pics = await getSetPictures(set, lang)
	const englishName = resolveEnglishName(set, lang)
	return {
		cardCount: {
			firstEd: cards.reduce((count, card) => count + getVariantCountForType(card[1],"firstEdition"), 0),
			holo: cards.reduce((count, card) => count + getVariantCountForType(card[1],"holo"), 0),
			normal: cards.reduce((count, card) => count + getVariantCountForType(card[1],"normal"), 0),
			official: set.cardCount.official,
			reverse: cards.reduce((count, card) => count + getVariantCountForType(card[1],"reverse"), 0),
			total: Math.max(set.cardCount.official, cards.length)
		},
		cards: await Promise.all(cards.map(([id, card]) => cardToCardSimple(id, card, lang))),
		id: set.id,
		legal: {
			expanded: setIsLegal('expanded', set),
			standard: setIsLegal('standard', set)
		},
		logo: pics[0],
		name: resolveText(set.name, lang),
		...(englishName ? { englishName } : {}),
		releaseDate: typeof set.releaseDate === 'object' ? set.releaseDate[lang] ?? set.releaseDate[objectKeys(set.releaseDate)[0]]! : set.releaseDate,
		serie: {
			id: set.serie.id,
			name: resolveText(set.serie.name, lang)
		},
		symbol: pics[1],
		tcgOnline: set.tcgOnline,
		abbreviation: (set.abbreviations?.official || resolveText(set.abbreviations, lang)) ? {
			official: set.abbreviations?.official,
			localized: resolveText(set.abbreviations, lang)
		} : undefined,
		boosters: set.boosters ? objectMap(set.boosters, (booster, id) => ({
			id: `boo_${set.id}-${id}`,
			name: resolveText(booster.name, lang),
			// images will be coming soon...
		})) : undefined,
		thirdParty: set.thirdParty
	}
}
