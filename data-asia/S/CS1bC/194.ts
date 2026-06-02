import { Card } from "../../../interfaces"
import Set from "../CS1bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Quick Ball',
		ja: 'Quick Ball',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369376
		}
	}],
}

export default card
