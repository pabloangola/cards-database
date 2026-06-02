import { Card } from "../../../interfaces"
import Set from "../CS5bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Venusaur',
		ja: 'Venusaur',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 311032
		}
	}],
}

export default card
