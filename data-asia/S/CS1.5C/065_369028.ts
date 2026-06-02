import { Card } from "../../../interfaces"
import Set from "../CS1.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Sinistea',
		ja: 'Sinistea',
	},

	category: 'Pokemon',
	rarity: 'Shiny Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369028
		}
	}],
}

export default card
