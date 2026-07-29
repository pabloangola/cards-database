<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../SM5S"

const card: Card = {
	set: Set,

	name: {
		en: 'Gardenia',
		ja: 'Gardenia',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144014
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
		ja: "ナタネ",
	},

	illustrator: "You Iribi",
	category: "Trainer",

	effect: {
		ja: "[草]エネルギーがついている自分のポケモン1匹のHPを「80」回復する。",
	},

	variants: [
		{
			type: "holo",
			thirdParty: {
				cardmarket: 560024,
			},
		},
	],

	trainerType: "Supporter",
	rarity: "Ultra Rare",
};

export default card;
>>>>>>> upstream/master
