import { Card } from "../../../interfaces"
import Set from "../XY1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Red Card',
		ja: 'Red Card',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136781
		}
	}],
}

export default card
