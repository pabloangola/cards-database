import { Card } from "../../../interfaces"
import Set from "../CS3b"

const card: Card = {
	set: Set,

	name: {
		en: 'Caitlin',
		ja: 'Caitlin',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 368866
		}
	}],
}

export default card
