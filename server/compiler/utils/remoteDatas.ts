import type { Set, SupportedLanguages } from '../../../interfaces.d.ts'
import { fetchRemoteFile } from './util'

type RemoteDatas = Record<string, unknown>

let remoteDatas: RemoteDatas | null = null

export async function initRemoteDatas(): Promise<void> {
	if (remoteDatas) {
		return
	}
	remoteDatas = await fetchRemoteFile<RemoteDatas>('https://assets.tcgdex.net/datas.json')
}

export function getRemoteDatas(): RemoteDatas | null {
	return remoteDatas
}

export function cardImageBaseUrl(
	localId: string,
	card: { set: Set },
	lang: SupportedLanguages,
): string | undefined {
	const file = remoteDatas
	if (!file) {
		return undefined
	}
	const langBucket = file[lang] as Record<string, Record<string, Record<string, unknown>>> | undefined
	const exists = Boolean(langBucket?.[card.set.serie.id]?.[card.set.id]?.[localId])
	if (!exists) {
		return undefined
	}
	return `https://assets.tcgdex.net/${lang}/${card.set.serie.id}/${card.set.id}/${localId}`
}

export function setPictureUrls(set: Set, lang: SupportedLanguages): [string | undefined, string | undefined] {
	const file = remoteDatas
	if (!file) {
		return [undefined, undefined]
	}
	const langBucket = file[lang] as Record<string, Record<string, { logo?: unknown }>> | undefined
	const univ = file.univ as Record<string, Record<string, { symbol?: unknown }>> | undefined
	const logoExists = langBucket?.[set.serie.id]?.[set.id]?.logo
		? `https://assets.tcgdex.net/${lang}/${set.serie.id}/${set.id}/logo`
		: undefined
	const symbolExists = univ?.[set.serie.id]?.[set.id]?.symbol
		? `https://assets.tcgdex.net/univ/${set.serie.id}/${set.id}/symbol`
		: undefined
	return [logoExists, symbolExists]
}
