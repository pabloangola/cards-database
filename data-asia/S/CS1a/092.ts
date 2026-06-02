import { Card } from "../../../interfaces"
import Set from "../CS1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Whiscash',
		ja: 'Whiscash',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369472
		}
	}],
}

export default card
