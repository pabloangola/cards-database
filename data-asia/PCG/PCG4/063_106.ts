import { Card } from "../../../interfaces"
import Set from "../PCG4"

const card: Card = {
	set: Set,

	name: {
		en: 'Unown',
		ja: 'Unown',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139149
		}
	}],
}

export default card
