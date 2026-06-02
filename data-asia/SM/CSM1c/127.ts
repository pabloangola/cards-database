import { Card } from "../../../interfaces"
import Set from "../CSM1c"

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
