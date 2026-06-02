import { Card } from "../../../interfaces"
import Set from "../CP4"

const card: Card = {
	set: Set,

	name: {
		en: 'Brigette',
		ja: 'Brigette',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 271920
		}
	}],
}

export default card
