import { Card } from "../../../interfaces"
import Set from "../Pt4"

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
			cardtrader: 135246
		}
	}],
}

export default card
