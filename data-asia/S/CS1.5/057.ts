import { Card } from "../../../interfaces"
import Set from "../CS1.5"

const card: Card = {
	set: Set,

	name: {
		en: 'Dottler',
		ja: 'Dottler',
	},

	category: 'Pokemon',
	rarity: 'Shiny Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369019
		}
	}],
}

export default card
