import { Card } from "../../../interfaces"
import Set from "../CS3.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Peony',
		ja: 'Peony',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 360843
		}
	}],
}

export default card
