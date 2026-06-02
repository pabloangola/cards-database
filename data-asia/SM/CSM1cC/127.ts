import { Card } from "../../../interfaces"
import Set from "../CSM1cC"

const card: Card = {
	set: Set,

	name: {
		en: 'PokéNav',
		ja: 'PokéNav',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370333
		}
	}],
}

export default card
