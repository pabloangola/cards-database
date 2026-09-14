import { Card } from "../../../interfaces";
import Set from "../S8b";

const card: Card = {
	set: Set,
	name: {
		ja: "コック",
	},

	illustrator: "Sanosuke Sakuma",
	category: "Trainer",

	effect: {
		ja: "自分のバトルポケモンのHPを「70」回復する。",
	},

	variants: [
		{
			type: "holo",
			thirdParty: {
				cardtrader: 233119,
				cardmarket: 587058,
				tcgplayer: 571512,
			},
		},
	],

	trainerType: "Supporter",
	regulationMark: "E",
	rarity: "Ultra Rare",
};

export default card;
