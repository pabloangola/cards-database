import { Card } from "../../../interfaces"
import Set from "../CP6"

const card: Card = {
	set: Set,

	name: {
		en: 'Potion',
		ja: 'Potion',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 138208
		}
	}],
}

export default card
