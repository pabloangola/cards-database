import { Card } from "../../../interfaces"
import Set from "../CS1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Big Parasol',
		ja: 'Big Parasol',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369378
		}
	}],
}

export default card
