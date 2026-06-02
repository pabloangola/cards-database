import { Card } from "../../../interfaces"
import Set from "../CSM1bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Adventure Bag',
		ja: 'Adventure Bag',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370200
		}
	}],
}

export default card
