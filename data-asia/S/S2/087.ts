import { Card } from "../../../interfaces"
import Set from "../S2"

const card: Card = {
	set: Set,

	name: {
		en: 'Nugget',
		ja: 'Nugget',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 141442
		}
	}],
}

export default card
