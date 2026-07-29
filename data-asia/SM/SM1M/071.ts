<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../SM1M"

const card: Card = {
	set: Set,

	name: {
		en: 'Nest Ball',
		ja: 'Nest Ball',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136586
		}
	}],
}

export default card
=======
import { Card } from "../../../interfaces";
import Set from "../SM1M";

const card: Card = {
	set: Set,
	name: {
		ja: "ネストボール",
	},

	illustrator: "",
	category: "Trainer",

	effect: {
		ja: "自分の山札にあるたねポケモンを1枚、ベンチに出す。そして山札を切る。",
	},

	variants: [
		{
			type: "holo",
			thirdParty: {
				cardmarket: 561672,
			},
		},
	],

	trainerType: "Item",
	rarity: "Secret Rare",
};

export default card;
>>>>>>> upstream/master
