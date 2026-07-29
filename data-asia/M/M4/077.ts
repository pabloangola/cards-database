<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../M4"

const card: Card = {
	set: Set,

	name: {
		en: 'Roxie\'s Performance',
		ja: 'Roxie\'s Performance',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 378051
		}
	}],
}

export default card
=======
import { Card } from "../../../interfaces";
import Set from "../M4";

const card: Card = {
	set: Set,
	name: {
		ja: "ホミカの演奏",
	},

	illustrator: "Nobusawa/Mochipuyo",
	category: "Trainer",

	effect: {
		ja: "次の相手の番、相手のどくのポケモンは、にげられない。（新しくどくにしたポケモンもふくむ。）",
	},

	variants: [
		{
			type: "normal",
			thirdParty: {
				cardmarket: 876976,
			},
		},
	],

	trainerType: "Supporter",
	regulationMark: "J",
	rarity: "Uncommon",
};

export default card;
>>>>>>> upstream/master
