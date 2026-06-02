import { Card } from "../../../interfaces"
import Set from "../CSM2b"

const card: Card = {
	set: Set,

	name: {
		en: 'Red & Blue',
		ja: 'Red & Blue',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 353111
		}
	}],
}

export default card
