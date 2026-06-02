import { Card } from "../../../interfaces"
import Set from "../CSV6C"

const card: Card = {
	set: Set,

	name: {
		en: 'Roark',
		ja: 'Roark',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 361440
		}
	}],
}

export default card
