import { Card } from "../../../interfaces"
import Set from "../XY2"

const card: Card = {
	set: Set,

	name: {
		en: 'Golem',
		ja: 'Golem',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144273
		}
	}],
}

export default card
