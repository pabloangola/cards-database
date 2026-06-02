import { Card } from "../../../interfaces"
import Set from "../PCG10"

const card: Card = {
	set: Set,

	name: {
		en: 'Lairon',
		ja: 'Lairon',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144475
		}
	}],
}

export default card
