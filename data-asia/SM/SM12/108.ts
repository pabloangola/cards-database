import { Card } from "../../../interfaces"
import Set from "../SM12"

const card: Card = {
	set: Set,

	name: {
		en: 'Red & Blue',
		ja: 'Red & Blue',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135430
		}
	}],
}

export default card
