import { Card } from "../../../interfaces"
import Set from "../CS2.5"

const card: Card = {
	set: Set,

	name: {
		en: 'Rose',
		ja: 'Rose',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 368939
		}
	}],
}

export default card
