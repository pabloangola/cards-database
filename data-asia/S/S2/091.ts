import { Card } from "../../../interfaces"
import Set from "../S2"

const card: Card = {
	set: Set,

	name: {
		en: 'Dan',
		ja: 'Dan',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 141446
		}
	}],
}

export default card
