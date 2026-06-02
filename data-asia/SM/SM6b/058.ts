import { Card } from "../../../interfaces"
import Set from "../SM6b"

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
			cardtrader: 262836
		}
	}],
}

export default card
