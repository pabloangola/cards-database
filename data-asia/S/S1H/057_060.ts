import { Card } from "../../../interfaces"
import Set from "../S1H"

const card: Card = {
	set: Set,

	name: {
		en: 'Lucky Egg',
		ja: 'Lucky Egg',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142264
		}
	}],
}

export default card
