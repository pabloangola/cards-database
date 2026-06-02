import { Card } from "../../../interfaces"
import Set from "../CS3.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Peony',
		ja: 'Peony',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 360825
		}
	}],
}

export default card
