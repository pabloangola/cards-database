import { Card } from "../../../interfaces"
import Set from "../CS2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Leon',
		ja: 'Leon',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 366852
		}
	}],
}

export default card
