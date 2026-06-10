/* eslint-disable sort-keys */
import type { Card, SupportedLanguages, Types, variant_detailed, VariantStamps, VariantType } from '../../../interfaces.d.ts'
import { CardResume, Card as CardSingle, SetResume, variant_detailed as ApiVariantDetailed } from '../../../meta/definitions/api'
import { setToSetSimple } from './setUtil'
import translate from './translationUtil'
import { cardImageBaseUrl } from './remoteDatas'
import { cardIsLegal, getDataFolder, getLastEdit, resolveText } from './util'

export { getCard, getCards, getCardsFromPaths } from './cardLoader'
import { objectMap, objectPick } from '@dzeio/object-util'
import { formatVariant, variantToIdentifier } from "./variantUtil.ts";

export function getCardPictures(cardId: string, card: Card, lang: SupportedLanguages): string | undefined {
	return cardImageBaseUrl(cardId, card, lang)
}

export async function cardToCardSimple(id: string, card: Card, lang: SupportedLanguages): Promise<CardResume> {
	const cardName = resolveText(card.name, lang)
	if (!cardName) {
		throw new Error(`Card (${card.set.id}-${id}) has no name in (${lang})`)
	}
	const img = getCardPictures(id, card, lang)
	return {
		id: `${card.set.id}-${id}`,
		image: img,
		localId: id,
		name: cardName
	}
}

function variantsDetailedToVariants(variants_detailed: Array<variant_detailed>): CardSingle['variants'] {
	return {
		firstEdition: variants_detailed?.some((variant) => variant.stamp?.some((stamp) => stamp === '1st-edition')) ?? false,
		holo: variants_detailed?.some((variant) => variant.type === 'holo') ?? false,
		normal: variants_detailed?.some((variant) => variant.type === 'normal') ?? false,
		reverse: variants_detailed?.some((variant) => variant.type === 'reverse') ?? false,
		wPromo: variants_detailed?.some((variant) => variant.stamp?.some((stamp) => stamp === 'w-Promo' as VariantStamps)) ?? false
	}
}

function variantsToVariantsDetailed(variants: CardSingle['variants'],lang: SupportedLanguages): Array<ApiVariantDetailed> {
	const result: Array<ApiVariantDetailed> = [];
	const addVariant = (type: string, stamps: string[] = []) => {
		result.push({
			type: type as VariantType,
			size: translate('variantSize', "standard", lang) as any,
			stamp: stamps.length > 0 ? stamps as Array<VariantStamps> : undefined,
			variantId: "generated"
		});
	};

	if (typeof variants?.normal === 'boolean' ? variants.normal : true) {
		addVariant('normal');
		if (variants?.firstEdition) addVariant('normal', ['1st-edition']);
		if (variants?.wPromo) addVariant('normal', ['w-Promo']);
	}
	if (typeof variants?.reverse === 'boolean' ? variants.reverse : false) {
		addVariant('reverse');
		if (variants?.firstEdition) addVariant('reverse', ['1st-edition']);
	}
	if (typeof variants?.holo === 'boolean' ? variants.holo : false) {
		addVariant('holo');
		if (variants?.firstEdition) addVariant('holo', ['1st-edition']);
	}

	return result.length > 0 ? result : undefined;
}

// eslint-disable-next-line max-lines-per-function
export interface CardCompileContext {
	setResume?: SetResume
}

export async function cardToCardSingle(
	localId: string,
	card: Card,
	lang: SupportedLanguages,
	context?: CardCompileContext,
): Promise<CardSingle> {
	const image = getCardPictures(localId, card, lang)

	if (!card.name[lang]) {
		throw new Error(`Card (${localId}) dont exist in (${lang})`)
	}

	return {
		category: translate('category', card.category, lang) as any,
		id: `${card.set.id}-${localId}`,
		illustrator: card.illustrator,
		image,
		localId,
		name: resolveText(card.name, lang) as string,

		rarity: translate('rarity', card.rarity, lang) as any,
		set: context?.setResume ?? await setToSetSimple(card.set, lang),

		variants : Array.isArray(card.variants) ?
			variantsDetailedToVariants(card.variants) : {
			firstEdition: typeof card.variants?.firstEdition === 'boolean' ? card.variants.firstEdition : false,
			holo: typeof card.variants?.holo === 'boolean' ? card.variants.holo : false,
			normal: typeof card.variants?.normal === 'boolean' ? card.variants.normal : true,
			reverse: typeof card.variants?.reverse === 'boolean' ? card.variants.reverse : false,
			wPromo: typeof card.variants?.wPromo === 'boolean' ? card.variants.wPromo : false
		},

		variants_detailed: Array.isArray(card.variants)
			? await Promise.all(card.variants.map(async (variant, index) => {
				const variantId = variantToIdentifier(variant);
				let formattedVariant = formatVariant(variant,lang)

				return {
					...formattedVariant,
					variantId
				} as ApiVariantDetailed
			}))
			: variantsToVariantsDetailed(card.variants, lang),

		dexId: card.dexId,
		hp: card.hp,
		types: card.types?.map((t) => translate('types', t, lang)) as Array<Types>,
		evolveFrom: card.evolveFrom && resolveText(card.evolveFrom, lang),
		weight: card.weight,
		description: card.description ? resolveText(card.description, lang) as string : undefined,
		level: card.level,
		stage: translate('stage', card.stage, lang) as any,
		suffix: translate('suffix', card.suffix, lang) as any,
		item: card.item ? {
			name: resolveText(card.item.name, lang),
			effect: resolveText(card.item.effect, lang)
		} : undefined,

		abilities: card.abilities?.map((el) => ({
			type: translate('abilityType', el.type, lang) as any,
			name: resolveText(el.name, lang),
			effect: resolveText(el.effect, lang)
		})),

		attacks: card.attacks?.map((el) => ({
			cost: el.cost?.map((t) => translate('types', t, lang)) as Array<Types>,
			name: resolveText(el.name, lang) as string,
			effect: el.effect ? resolveText(el.effect, lang) : undefined,
			damage: el.damage
		})),
		weaknesses: card.weaknesses?.map((el) => ({
			type: translate('types', el.type, lang) as Types,
			value: el.value
		})),

		resistances: card.resistances?.map((el) => ({
			type: translate('types', el.type, lang) as Types,
			value: el.value
		})),

		retreat: card.retreat,

		effect: card.effect ? resolveText(card.effect, lang) : undefined,

		trainerType: translate('trainerType', card.trainerType, lang) as any,
		energyType: translate('energyType', card.energyType, lang) as any,
		regulationMark: card.regulationMark,

		legal: {
			standard: cardIsLegal('standard', card, localId),
			expanded: cardIsLegal('expanded', card, localId)
		},
		boosters: card.boosters ? objectMap(objectPick(card.set.boosters, ...card.boosters), (booster, id) => ({
			id: `boo_${card.set.id}-${id}`,
			name: resolveText(booster.name, lang),
			// images will be coming soon...
		})) : undefined,
		updated: await getCardLastEdit(localId, card, lang),

		thirdParty: card.thirdParty
	}
}

export async function getCardLastEdit(localId: string, card: Card, lang: SupportedLanguages): Promise<string> {
	try {
		const path = `../${getDataFolder(lang)}/${card.set.serie.name.en}/${card.set.name.en ?? card.set.name.fr}/${localId}.ts`
		return getLastEdit(path)
	} catch (e) {
		try {
			const path = `../${getDataFolder(lang)}/${card.set.serie.id}/${card.set.id}/${localId}.ts`
			return getLastEdit(path)
		} catch (e2) {
			console.error(card)
			console.error(e)
			throw e2
		}
	}
}
