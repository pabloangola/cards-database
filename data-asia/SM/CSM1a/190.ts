import { Card } from "../../../interfaces"
import Set from "../CSM1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Charizard GX',
		ja: 'Charizard GX',
	},

	category: 'Pokemon',
	rarity: 'Shiny Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369785
		}
	}],
}

export default card
