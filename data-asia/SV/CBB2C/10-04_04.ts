import { Card } from "../../../interfaces"
import Set from "../CBB2C"

const card: Card = {
	set: Set,

	name: {
		en: 'Penny',
		ja: 'Penny',
	},

	category: 'Pokemon',
	rarity: 'Special Illustration Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 333476
		}
	}],
}

export default card
