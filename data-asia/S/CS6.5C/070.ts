import { Card } from "../../../interfaces"
import Set from "../CS6.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Lance',
		ja: 'Lance',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 338799
		}
	}],
}

export default card
