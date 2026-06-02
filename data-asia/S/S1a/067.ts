import { Card } from "../../../interfaces"
import Set from "../S1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Milo',
		ja: 'Milo',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 254564
		}
	}],
}

export default card
