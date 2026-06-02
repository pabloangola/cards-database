import { Card } from "../../../interfaces"
import Set from "../SM12"

const card: Card = {
	set: Set,

	name: {
		en: 'Red & Blue',
		ja: 'Red & Blue',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135412
		}
	}],
}

export default card
