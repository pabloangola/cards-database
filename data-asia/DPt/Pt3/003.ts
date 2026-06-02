import { Card } from "../../../interfaces"
import Set from "../Pt3"

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
			cardtrader: 135884
		}
	}],
}

export default card
