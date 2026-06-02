import { Card } from "../../../interfaces"
import Set from "../SM7b"

const card: Card = {
	set: Set,

	name: {
		en: 'Gardevoir',
		ja: 'Gardevoir',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 282122
		}
	}],
}

export default card
