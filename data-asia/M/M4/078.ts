import { Card } from "../../../interfaces"
import Set from "../M4"

const card: Card = {
	set: Set,

	name: {
		en: 'Emma',
		ja: 'Emma',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 378052
		}
	}],
}

export default card
