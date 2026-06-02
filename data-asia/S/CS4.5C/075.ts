import { Card } from "../../../interfaces"
import Set from "../CS4.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Café Master',
		ja: 'Café Master',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347695
		}
	}],
}

export default card
