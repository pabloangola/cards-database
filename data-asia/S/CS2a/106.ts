import { Card } from "../../../interfaces"
import Set from "../CS2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Leon',
		ja: 'Leon',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 366820
		}
	}],
}

export default card
