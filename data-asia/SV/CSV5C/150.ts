import { Card } from "../../../interfaces"
import Set from "../CSV5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Clive',
		ja: 'Clive',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 350218
		}
	}],
}

export default card
