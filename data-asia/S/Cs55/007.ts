import { Card } from "../../../interfaces"
import Set from "../Cs55"

const card: Card = {
	set: Set,

	name: {
		en: 'Radiant Charizard',
		ja: 'Radiant Charizard',
	},

	category: 'Pokemon',
	rarity: 'Shiny Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349371
		}
	}],
}

export default card
