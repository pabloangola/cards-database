import { Card } from "../../../interfaces"
import Set from "../CSM1.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Morgan',
		ja: 'Morgan',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369766
		}
	}],
}

export default card
