import { Card } from "../../../interfaces"
import Set from "../PCG5"

const card: Card = {
	set: Set,

	name: {
		en: 'Machoke',
		ja: 'Machoke',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140460
		}
	}],
}

export default card
