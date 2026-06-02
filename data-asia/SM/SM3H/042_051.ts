import { Card } from "../../../interfaces"
import Set from "../SM3H"

const card: Card = {
	set: Set,

	name: {
		en: 'Persian',
		ja: 'Persian',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 143844
		}
	}],
}

export default card
