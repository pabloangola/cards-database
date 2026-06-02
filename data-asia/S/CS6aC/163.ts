import { Card } from "../../../interfaces"
import Set from "../CS6aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Serena',
		ja: 'Serena',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345752
		}
	}],
}

export default card
