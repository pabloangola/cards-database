import { Card } from "../../../interfaces"
import Set from "../CS1.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Orbeetle',
		ja: 'Orbeetle',
	},

	category: 'Pokemon',
	rarity: 'Shiny Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369020
		}
	}],
}

export default card
