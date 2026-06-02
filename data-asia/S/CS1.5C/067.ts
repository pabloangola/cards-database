import { Card } from "../../../interfaces"
import Set from "../CS1.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Koffing',
		ja: 'Koffing',
	},

	category: 'Pokemon',
	rarity: 'Shiny Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369029
		}
	}],
}

export default card
