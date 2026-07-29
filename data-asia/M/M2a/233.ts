<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../M2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Mega Froslass ex',
		ja: 'Mega Froslass ex',
	},

	category: 'Pokemon',
	rarity: 'Special Illustration Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 360097
		}
	}],
}

export default card
=======
import { Card } from "../../../interfaces";
import Set from "../M2a";

const card: Card = {
	set: Set,
	name: {
		ja: "メガユキメノコex",
	},

	illustrator: "Teeziro",
	category: "Pokemon",
	hp: 310,
	types: ["Water"],

	stage: "Stage1",

	attacks: [
		{
			name: { ja: "うらみぶし" },
			damage: "50×",
			cost: ["Water"],
			effect: {
				ja: "相手の手札の枚数×50ダメージ。",
			},
		},
		{
			name: { ja: "アブソリュートスノー" },
			damage: 150,
			cost: ["Water", "Colorless", "Colorless"],
			effect: {
				ja: "相手のバトルポケモンをねむりにする。",
			},
		},
	],

	weaknesses: [{ type: "Metal", value: "x2" }],
	resistances: [],

	variants: [
		{
			type: "holo",
			thirdParty: {
				cardmarket: 861476,
			},
		},
	],

	evolveFrom: {
		ja: "ユキワラシ",
	},

	retreat: 1,
	regulationMark: "I",
	rarity: "Special illustration rare",
	dexId: [478],

	suffix: "EX",
};

export default card;
>>>>>>> upstream/master
