import { Card } from "../../../interfaces"
import Set from "../Pt4"

const card: Card = {
	set: Set,

	name: {
		en: 'Department Store Girl',
		ja: 'Department Store Girl',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135250
		}
	}],
}

export default card
