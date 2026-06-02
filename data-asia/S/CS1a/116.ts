import { Card } from "../../../interfaces"
import Set from "../CS1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Bunnelby',
		ja: 'Bunnelby',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369495
		}
	}],
}

export default card
