import { Card } from "../../../interfaces"
import Set from "../SM9"

const card: Card = {
	set: Set,

	name: {
		en: 'Charizard',
		ja: 'Charizard',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 143400
		}
	}],
}

export default card
