import { Card } from "../../../interfaces"
import Set from "../L1a"

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
			cardtrader: 139535
		}
	}],
}

export default card
