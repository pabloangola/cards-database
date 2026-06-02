import { Card } from "../../../interfaces"
import Set from "../CSV6C"

const card: Card = {
	set: Set,

	name: {
		en: 'Tulip',
		ja: 'Tulip',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 361442
		}
	}],
}

export default card
