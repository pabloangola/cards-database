import { Card } from "../../../interfaces"
import Set from "../Cs61"

const card: Card = {
	set: Set,

	name: {
		en: 'Cook',
		ja: 'Cook',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349055
		}
	}],
}

export default card
