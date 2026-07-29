<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../SM12a"

const card: Card = {
	set: Set,

	name: {
		en: 'Wishiwashi GX',
		ja: 'Wishiwashi GX',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 260555
		}
	}],
}

export default card
=======
import { Card } from "../../../interfaces";
import Set from "../SM12a";

const card: Card = {
	set: Set,
	name: {
		ja: "ヨワシGX",
	},

	illustrator: "sadaji",
	category: "Pokemon",
	hp: 130,
	types: ["Water"],

	stage: "Basic",

	attacks: [
		{
			name: { ja: "ぎょぐんストーム" },
			damage: "20×",
			cost: ["Water", "Colorless"],
			effect: {
				ja: "分の場の「ヨワシ（GXをふくむ）」の数×20ダメージ。",
			},
		},
		{
			name: { ja: "たいりょうGX" },
			cost: ["Colorless"],
			effect: {
				ja: "分の山札を上から12枚見て、その中にあるたねポケモンを好きなだけ、ベンチに出す。残りのカードは山札にもどして切る。［対戦中、自分はGXワザを1回しか使えない。］",
			},
		},
	],

	weaknesses: [{ type: "Lightning", value: "x2" }],
	resistances: [],

	variants: [
		{
			type: "holo",
			thirdParty: {
				cardmarket: 544616,
			},
		},
	],

	retreat: 1,
	regulationMark: "C",
	rarity: "Ultra Rare",
	dexId: [746],

	suffix: "GX",
};

export default card;
>>>>>>> upstream/master
