import { Card } from "../../../interfaces"
import Set from "../SM5M"

const card: Card = {
	set: Set,

	name: {
		en: 'Rotom',
		ja: 'Rotom',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 143888
		}
	}],
}

export default card
