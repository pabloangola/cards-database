import { Card } from "../../../interfaces"
import Set from "../XY6"

const card: Card = {
	set: Set,

	name: {
		en: 'Wally',
		ja: 'Wally',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 137886
		}
	}],
}

export default card
