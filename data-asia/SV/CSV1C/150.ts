import { Card } from "../../../interfaces"
import Set from "../CSV1C"

const card: Card = {
	set: Set,

	name: {
		en: 'Arven',
		ja: 'Arven',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 340548
		}
	}],
}

export default card
