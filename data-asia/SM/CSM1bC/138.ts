import { Card } from "../../../interfaces"
import Set from "../CSM1bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Mallow',
		ja: 'Mallow',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370140
		}
	}],
}

export default card
