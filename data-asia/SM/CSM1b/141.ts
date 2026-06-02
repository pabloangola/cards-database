import { Card } from "../../../interfaces"
import Set from "../CSM1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Copycat',
		ja: 'Copycat',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370143
		}
	}],
}

export default card
