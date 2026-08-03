import { Card } from "../../../interfaces"
import Set from "../M2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Mega Diancie ex',
		ja: 'メガディアンシーex',
	},

	illustrator: "DOM",
	category: 'Pokemon',
	hp: 270,
	types: ["Psychic"],
	rarity: 'Ultra Rare',
	stage: "Basic",
	suffix: "EX",
	dexId: [719],
	regulationMark: "I",
	retreat: 1,

	abilities: [
		{
			type: "Ability",
			name: {
				en: "Diamond Coat",
				ja: "ダイヤコート",
			},
			effect: {
				en: "This Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance).",
				ja: "このポケモンが受けるワザのダメージは「-30」される。",
			},
		},
	],

	attacks: [
		{
			name: {
				en: "Garland Ray",
				ja: "ガーランドレイ",
			},
			damage: "120×",
			cost: ["Psychic", "Psychic"],
			effect: {
				en: "Discard up to 2 Energy from this Pokémon. This attack does 120 damage for each card you discarded in this way.",
				ja: "このポケモンについているエネルギーを2枚までトラッシュし、その枚数×120ダメージ。",
			},
		},
	],

	weaknesses: [{ type: "Metal", value: "x2" }],
	resistances: [],

	variants: [{
		type: 'holo',
		thirdParty: {
			cardtrader: 360092,
			cardmarket: 861470,
		}
	}],
}

export default card
