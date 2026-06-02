import { Card } from "../../../interfaces"
import Set from "../CS1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Greedent',
		ja: 'Greedent',
	},

	category: 'Pokemon',
	rarity: 'Shiny Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369339
		}
	}],
}

export default card
