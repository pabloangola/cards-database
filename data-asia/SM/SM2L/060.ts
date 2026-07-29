<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../SM2L"

const card: Card = {
	set: Set,

	name: {
		en: 'Aqua Patch',
		ja: 'Aqua Patch',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135320
		}
	}],
}

export default card
=======
import { Card } from "../../../interfaces";
import Set from "../SM2L";

const card: Card = {
	set: Set,
	name: {
		ja: "アクアパッチ",
	},

	illustrator: "",
	category: "Trainer",

	effect: {
		ja: "自分のトラッシュにある[水]エネルギーを1枚、ベンチの[水]ポケモンにつける。",
	},

	variants: [
		{
			type: "holo",
			thirdParty: {
				cardmarket: 561464,
			},
		},
	],

	trainerType: "Item",
	rarity: "Secret Rare",
};

export default card;
>>>>>>> upstream/master
