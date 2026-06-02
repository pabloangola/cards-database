import { Card } from "../../../interfaces"
import Set from "../L2"

const card: Card = {
	set: Set,

	name: {
		en: 'Legend Box',
		ja: 'Legend Box',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 141752
		}
	}],
}

export default card
