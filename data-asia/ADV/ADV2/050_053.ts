import { Card } from "../../../interfaces"
import Set from "../ADV2"

const card: Card = {
	set: Set,

	name: {
		en: 'Rare Candy',
		ja: 'Rare Candy',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140409
		}
	}],
}

export default card
