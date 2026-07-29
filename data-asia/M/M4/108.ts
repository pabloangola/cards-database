<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../M4"

const card: Card = {
	set: Set,

	name: {
		en: 'AZ\'s Tranquility',
		ja: 'AZ\'s Tranquility',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 378082
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
		ja: "AZの安らぎ",
	},

	illustrator: "GIDORA",
	category: "Trainer",

	effect: {
		ja: "自分のバトルポケモンをベンチポケモンと入れ替える。「ポケモンex」をベンチに入れ替えた場合、そのポケモンのHPを「80」回復する。",
	},

	variants: [
		{
			type: "holo",
			thirdParty: {
				cardmarket: 877361,
			},
		},
	],

	trainerType: "Supporter",
	regulationMark: "J",
	rarity: "Ultra Rare",
};

export default card;
>>>>>>> upstream/master
