<<<<<<< HEAD
import { Card } from "../../../interfaces"
import Set from "../SM4S"

const card: Card = {
	set: Set,

	name: {
		en: 'Metal Energy',
		ja: 'Metal Energy',
	},

	category: 'Energy',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135501
		}
	}],
}

export default card
=======
import { Card } from "../../../interfaces";
import Set from "../SM4S";

const card: Card = {
	set: Set,
	name: {
		ja: "基本鋼エネルギー",
	},

	illustrator: "",
	category: "Energy",
	energyType: "Normal",

	variants: [
		{
			type: "holo",
			thirdParty: {
				cardmarket: 560374,
			},
		},
	],

	rarity: "Secret Rare",
};

export default card;
>>>>>>> upstream/master
