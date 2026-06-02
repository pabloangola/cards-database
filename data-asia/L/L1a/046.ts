import { Card } from "../../../interfaces"
import Set from "../L1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Donphan',
		ja: 'Donphan',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139537
		}
	}],
}

export default card
