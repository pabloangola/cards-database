import { Card } from "../../../interfaces"
import Set from "../BW3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Pokémon Center',
		ja: 'Pokémon Center',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139445
		}
	}],
}

export default card
