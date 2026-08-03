import { Card } from "../../../interfaces"
import Set from "../S4a"

const card: Card = {
	set: Set,

	name: {
		en: 'Ball Guy',
		ja: 'Ball Guy',
	},

	category: 'Pokemon',
	rarity: 'Shiny Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 225203
		}
	}],
}

export default card
