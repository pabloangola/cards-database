import { Card } from "../../../interfaces"
import Set from "../CS3aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Phoebe',
		ja: 'Phoebe',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349744
		}
	}],
}

export default card
