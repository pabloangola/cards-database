import { Card } from "../../../interfaces"
import Set from "../CS4.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Battle VIP Pass',
		ja: 'Battle VIP Pass',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347672
		}
	}],
}

export default card
