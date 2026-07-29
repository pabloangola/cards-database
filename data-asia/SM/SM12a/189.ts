<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../SM12a"

const card: Card = {
	set: Set,

	name: {
		en: 'Will',
		ja: 'Will',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 260514
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
		ja: "イツキ",
	},

	illustrator: "Kazuma Koda",
	category: "Trainer",

	effect: {
		ja: "この番、このカードを使ったあとに、ワザ・特性・トレーナーズの効果で自分が次に投げるコインは、最初の1回だけ、オモテかウラか選べる。",
	},

	variants: [
		{
			type: "holo",
			thirdParty: {
				cardmarket: 544486,
			},
		},
	],

	trainerType: "Supporter",
	regulationMark: "C",
	rarity: "Ultra Rare",
};

export default card;
>>>>>>> upstream/master
