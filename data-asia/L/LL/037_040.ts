import { Card } from "../../../interfaces"
import Set from "../LL"

const card: Card = {
	set: Set,

	name: {
		en: 'Research Record',
		ja: 'Research Record',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 146509
		}
	}],
}

export default card
