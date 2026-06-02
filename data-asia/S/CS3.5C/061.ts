import { Card } from "../../../interfaces"
import Set from "../CS3.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Avery',
		ja: 'Avery',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 360824
		}
	}],
}

export default card
