import { Card } from "../../../interfaces"
import Set from "../CS1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Morgrem',
		ja: 'Morgrem',
	},

	category: 'Pokemon',
	rarity: 'Shiny Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369331
		}
	}],
}

export default card
