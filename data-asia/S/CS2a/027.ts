import { Card } from "../../../interfaces"
import Set from "../CS2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Charmander',
		ja: 'Charmander',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 366741
		}
	}],
}

export default card
