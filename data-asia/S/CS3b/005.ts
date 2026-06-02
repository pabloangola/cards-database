import { Card } from "../../../interfaces"
import Set from "../CS3b"

const card: Card = {
	set: Set,

	name: {
		en: 'Lilligant',
		ja: 'Lilligant',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349870
		}
	}],
}

export default card
