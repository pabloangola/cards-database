import { Card } from "../../../interfaces"
import Set from "../SM7"

const card: Card = {
	set: Set,

	name: {
		en: 'Pokémon Catcher',
		ja: 'Pokémon Catcher',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142567
		}
	}],
}

export default card
