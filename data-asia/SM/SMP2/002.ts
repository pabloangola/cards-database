import { Card } from "../../../interfaces"
import Set from "../SMP2"

const card: Card = {
	set: Set,

	name: {
		en: 'Bulbasaur',
		ja: 'Bulbasaur',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 255318
		}
	}],
}

export default card
