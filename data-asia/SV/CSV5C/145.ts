import { Card } from "../../../interfaces"
import Set from "../CSV5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Charizard ex',
		ja: 'Charizard ex',
	},

	category: 'Pokemon',
	rarity: 'Shiny Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 350224
		}
	}],
}

export default card
