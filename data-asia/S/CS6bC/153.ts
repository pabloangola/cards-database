import { Card } from "../../../interfaces"
import Set from "../CS6bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Brandon',
		ja: 'Brandon',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 346107
		}
	}],
}

export default card
