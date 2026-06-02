import { Card } from "../../../interfaces"
import Set from "../Pt3"

const card: Card = {
	set: Set,

	name: {
		en: 'Yanma',
		ja: 'Yanma',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135890
		}
	}],
}

export default card
