import { Card } from "../../../interfaces"
import Set from "../BW1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Sawsbuck',
		ja: 'Sawsbuck',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135996
		}
	}],
}

export default card
