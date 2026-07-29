<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../SM10b"

const card: Card = {
	set: Set,

	name: {
		en: 'Lusamine',
		ja: 'Lusamine',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 269852
		}
	}],
}

export default card
=======
import { Card } from "../../../interfaces";
import Set from "../SM10b";

const card: Card = {
	set: Set,
	name: {
		ja: "ルザミーネ",
	},

	illustrator: "Mana Ibe",
	category: "Trainer",

	effect: {
		ja: "自分のトラッシュにあるサポートとスタジアムを合計2枚、相手に見せてから、手札に加える。",
	},

	variants: [
		{
			type: "holo",
			thirdParty: {
				cardmarket: 557256,
			},
		},
	],

	trainerType: "Supporter",
	regulationMark: "A",
	rarity: "Rare Holo",
};

export default card;
>>>>>>> upstream/master
