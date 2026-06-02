import { Card } from "../../../interfaces"
import Set from "../CS1aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Kartana',
		ja: 'Kartana',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369877
		}
	}],
}

export default card
