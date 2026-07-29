<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../SM5S"

const card: Card = {
	set: Set,

	name: {
		en: 'Eevee',
		ja: 'Eevee',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 143992
		}
	}],
}

export default card
=======
import { Card } from "../../../interfaces";
import Set from "../SM5S";

const card: Card = {
	set: Set,
	name: {
		ja: "イーブイ",
	},

	illustrator: "Atsuko Nishida",
	category: "Pokemon",
	hp: 60,
	types: ["Colorless"],

	description: {
		ja: "今 現在の 調査では なんと ８種類もの ポケモンへ 進化する 可能性を 持つ。",
	},

	stage: "Basic",

	attacks: [
		{
			name: { ja: "かじる" },
			damage: 20,
			cost: ["Colorless"],
		},
	],

	weaknesses: [{ type: "Fighting", value: "x2" }],
	resistances: [],

	variants: [
		{
			type: "normal",
			thirdParty: {
				cardmarket: 560002,
			},
		},
	],

	retreat: 1,
	rarity: "Common",
	dexId: [133],
};

export default card;
>>>>>>> upstream/master
