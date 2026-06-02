import { Card } from "../../../interfaces"
import Set from "../CS5bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Bulbasaur',
		ja: 'Bulbasaur',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 311030
		}
	}],
}

export default card
