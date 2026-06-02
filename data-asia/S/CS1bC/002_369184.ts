import { Card } from "../../../interfaces"
import Set from "../CS1bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Metapod',
		ja: 'Metapod',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369184
		}
	}],
}

export default card
