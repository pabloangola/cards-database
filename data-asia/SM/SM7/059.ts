import { Card } from "../../../interfaces"
import Set from "../SM7"

const card: Card = {
	set: Set,

	name: {
		en: 'Kartana',
		ja: 'Kartana',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142542
		}
	}],
}

export default card
