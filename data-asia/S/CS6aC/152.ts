import { Card } from "../../../interfaces"
import Set from "../CS6aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Wallace',
		ja: 'Wallace',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345741
		}
	}],
}

export default card
