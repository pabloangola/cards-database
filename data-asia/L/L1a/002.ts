import { Card } from "../../../interfaces"
import Set from "../L1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Kakuna',
		ja: 'Kakuna',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139454
		}
	}],
}

export default card
