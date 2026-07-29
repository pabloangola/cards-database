<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../SM10"

const card: Card = {
	set: Set,

	name: {
		en: 'Giovanni\'s Exile',
		ja: 'Giovanni\'s Exile',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 137396
		}
	}],
}

export default card
=======
import { Card } from "../../../interfaces";
import Set from "../SM10";

const card: Card = {
	set: Set,
	name: {
		ja: "サカキの追放",
	},

	illustrator: "Megumi Mizutani",
	category: "Trainer",

	effect: {
		ja: "ダメカンがのっていない自分のベンチポケモンを2匹まで選び、選んだポケモンと、ついているすべてのカードを、トラッシュする。",
	},

	variants: [
		{
			type: "normal",
			thirdParty: {
				cardmarket: 557443,
			},
		},
	],

	trainerType: "Supporter",
	regulationMark: "C",
	rarity: "Uncommon",
};

export default card;
>>>>>>> upstream/master
