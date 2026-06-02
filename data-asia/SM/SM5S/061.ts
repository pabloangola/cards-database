import { Card } from "../../../interfaces"
import Set from "../SM5S"

const card: Card = {
	set: Set,

	name: {
		en: 'Pokémon Fan Club',
		ja: 'Pokémon Fan Club',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144005
		}
	}],
}

export default card
