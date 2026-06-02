import { Card } from "../../../interfaces"
import Set from "../Pt2"

const card: Card = {
	set: Set,

	name: {
		en: 'Pokémon Contest Hall',
		ja: 'Pokémon Contest Hall',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136200
		}
	}],
}

export default card
