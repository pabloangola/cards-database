import { Card } from "../../../interfaces"
import Set from "../ADV4"

const card: Card = {
	set: Set,

	name: {
		en: 'Omanyte',
		ja: 'Omanyte',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140025
		}
	}],
}

export default card
