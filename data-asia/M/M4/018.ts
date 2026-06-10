import { Card } from "../../../interfaces"
import Set from "../M4"

const card: Card = {
	set: Set,

	name: {
		en: 'Delibird',
		ja: 'Delibird',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 377992
		}
	}],
}

export default card
