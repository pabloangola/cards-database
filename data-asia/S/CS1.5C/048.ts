import { Card } from "../../../interfaces"
import Set from "../CS1.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Oleana',
		ja: 'Oleana',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369010
		}
	}],
}

export default card
