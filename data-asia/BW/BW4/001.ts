import { Card } from "../../../interfaces"
import Set from "../BW4"

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
			cardtrader: 136980
		}
	}],
}

export default card
