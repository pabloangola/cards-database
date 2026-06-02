import { Card } from "../../../interfaces"
import Set from "../CP6"

const card: Card = {
	set: Set,

	name: {
		en: 'Switch',
		ja: 'Switch',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 138212
		}
	}],
}

export default card
