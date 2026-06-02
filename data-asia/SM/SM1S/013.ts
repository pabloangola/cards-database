import { Card } from "../../../interfaces"
import Set from "../SM1S"

const card: Card = {
	set: Set,

	name: {
		en: 'Golduck',
		ja: 'Golduck',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136601
		}
	}],
}

export default card
