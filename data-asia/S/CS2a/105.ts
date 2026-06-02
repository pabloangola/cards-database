import { Card } from "../../../interfaces"
import Set from "../CS2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Bea',
		ja: 'Bea',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 366819
		}
	}],
}

export default card
