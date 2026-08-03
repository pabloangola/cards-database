import { Card } from "../../../interfaces"
import Set from "../Sf"

const card: Card = {
	set: Set,

	name: {
		en: 'Pokémon Communication',
		ja: 'Pokémon Communication',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 240238
		}
	}],
}

export default card
