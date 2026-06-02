import { Card } from "../../../interfaces"
import Set from "../CS2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Leon',
		ja: 'Leon',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 366842
		}
	}],
}

export default card
