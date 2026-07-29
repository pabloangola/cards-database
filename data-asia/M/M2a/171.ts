<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../M2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Surfer',
		ja: 'Surfer',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 360064
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
		ja: "サーファー",
	},

	illustrator: "Hideki Ishikawa",
	category: "Trainer",

	effect: {
		ja: "自分のバトルポケモンをベンチポケモンと入れ替える。その後、自分の手札が5枚になるように、山札を引く。",
	},

	variants: [
		{
			type: "normal",
			thirdParty: {
				cardmarket: 861414,
			},
		},
	],

	trainerType: "Supporter",
	regulationMark: "H",
	rarity: "None",
};

export default card;
>>>>>>> upstream/master
