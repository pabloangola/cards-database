import { Card } from "../../../interfaces"
import Set from "../SM8"

const card: Card = {
	set: Set,

	name: {
		en: 'Donphan',
		ja: 'Donphan',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 143252
		}
	}],
}

export default card
