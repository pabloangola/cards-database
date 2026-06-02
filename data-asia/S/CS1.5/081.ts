import { Card } from "../../../interfaces"
import Set from "../CS1.5"

const card: Card = {
	set: Set,

	name: {
		en: 'Kabu',
		ja: 'Kabu',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369043
		}
	}],
}

export default card
