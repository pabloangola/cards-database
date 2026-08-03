import { Card } from "../../../interfaces"
import Set from "../Sf"

const card: Card = {
	set: Set,

	name: {
		en: 'Piers',
		ja: 'Piers',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 240241
		}
	}],
}

export default card
