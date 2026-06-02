import { Card } from "../../../interfaces"
import Set from "../ADV5"

const card: Card = {
	set: Set,

	name: {
		en: 'Staryu',
		ja: 'Staryu',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144106
		}
	}],
}

export default card
