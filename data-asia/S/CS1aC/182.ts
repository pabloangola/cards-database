import { Card } from "../../../interfaces"
import Set from "../CS1aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Lady',
		ja: 'Lady',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369967
		}
	}],
}

export default card
