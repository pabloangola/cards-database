import { Card } from "../../../interfaces"
import Set from "../ADV2"

const card: Card = {
	set: Set,

	name: {
		en: 'Wally\'s Training',
		ja: 'Wally\'s Training',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140411
		}
	}],
}

export default card
