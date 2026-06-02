import { Card } from "../../../interfaces"
import Set from "../SM6"

const card: Card = {
	set: Set,

	name: {
		en: 'Pangoro',
		ja: 'Pangoro',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 119479
		}
	}],
}

export default card
