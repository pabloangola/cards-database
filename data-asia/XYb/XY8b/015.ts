import { Card } from "../../../interfaces"
import Set from "../XY8b"

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
			cardtrader: 141566
		}
	}],
}

export default card
