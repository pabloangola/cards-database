import { Card } from "../../../interfaces"
import Set from "../Pt4"

const card: Card = {
	set: Set,

	name: {
		en: 'Expert Belt',
		ja: 'Expert Belt',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135247
		}
	}],
}

export default card
