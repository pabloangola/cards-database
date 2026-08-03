import { Card } from "../../../interfaces"
import Set from "../Cs45"

const card: Card = {
	set: Set,

	name: {
		en: 'Oricorio',
		ja: 'Oricorio',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347624
		}
	}],
}

export default card
