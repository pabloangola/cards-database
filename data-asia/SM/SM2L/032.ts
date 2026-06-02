import { Card } from "../../../interfaces"
import Set from "../SM2L"

const card: Card = {
	set: Set,

	name: {
		en: 'Pangoro',
		ja: 'Pangoro',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135292
		}
	}],
}

export default card
