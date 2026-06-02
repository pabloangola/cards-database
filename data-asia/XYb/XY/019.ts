import { Card } from "../../../interfaces"
import Set from "../XY"

const card: Card = {
	set: Set,

	name: {
		en: 'Octillery',
		ja: 'Octillery',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 284671
		}
	}],
}

export default card
