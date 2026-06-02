import { Card } from "../../../interfaces"
import Set from "../SM6b"

const card: Card = {
	set: Set,

	name: {
		en: 'PokéNav',
		ja: 'PokéNav',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 262841
		}
	}],
}

export default card
