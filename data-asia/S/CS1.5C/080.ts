import { Card } from "../../../interfaces"
import Set from "../CS1.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Oleana',
		ja: 'Oleana',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369042
		}
	}],
}

export default card
