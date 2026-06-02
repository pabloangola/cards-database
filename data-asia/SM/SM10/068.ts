import { Card } from "../../../interfaces"
import Set from "../SM10"

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
			cardtrader: 137379
		}
	}],
}

export default card
