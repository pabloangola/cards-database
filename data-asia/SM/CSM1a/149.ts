import { Card } from "../../../interfaces"
import Set from "../CSM1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Lysandre Labs',
		ja: 'Lysandre Labs',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369934
		}
	}],
}

export default card
