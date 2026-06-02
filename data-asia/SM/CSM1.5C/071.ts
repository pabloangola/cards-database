import { Card } from "../../../interfaces"
import Set from "../CSM1.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Dana',
		ja: 'Dana',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369767
		}
	}],
}

export default card
