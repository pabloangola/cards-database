import { Card } from "../../../interfaces"
import Set from "../CS1bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Dubwool',
		ja: 'Dubwool',
	},

	category: 'Pokemon',
	rarity: 'Shiny Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369343
		}
	}],
}

export default card
