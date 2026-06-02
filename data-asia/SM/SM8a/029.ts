import { Card } from "../../../interfaces"
import Set from "../SM8a"

const card: Card = {
	set: Set,

	name: {
		en: 'Pangoro',
		ja: 'Pangoro',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 254768
		}
	}],
}

export default card
