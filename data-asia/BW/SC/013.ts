import { Card } from "../../../interfaces"
import Set from "../SC"

const card: Card = {
	set: Set,

	name: {
		en: 'Purrloin',
		ja: 'Purrloin',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 272940
		}
	}],
}

export default card
