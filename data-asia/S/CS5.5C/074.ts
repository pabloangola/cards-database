import { Card } from "../../../interfaces"
import Set from "../CS5.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Grant',
		ja: 'Grant',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349452
		}
	}],
}

export default card
