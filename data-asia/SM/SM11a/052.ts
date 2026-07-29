<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../SM11a"

const card: Card = {
	set: Set,

	name: {
		en: 'Great Catcher',
		ja: 'Great Catcher',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 248477
		}
	}],
}

export default card
=======
import { Card } from "../../../interfaces";
import Set from "../SM11a";

const card: Card = {
	set: Set,
	name: {
		ja: "グレートキャッチャー",
	},

	illustrator: "Studio Bora Inc.",
	category: "Trainer",

	effect: {
		ja: "このカードは、自分の手札を2枚トラッシュしなければ使えない。相手のベンチの「ポケモンGX・EX」を1匹選び、バトルポケモンと入れ替える。",
	},

	variants: [
		{
			type: "normal",
			thirdParty: {
				cardmarket: 556718,
			},
		},
	],

	trainerType: "Item",
	regulationMark: "C",
	rarity: "Uncommon",
};

export default card;
>>>>>>> upstream/master
