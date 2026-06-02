import { Card } from "../../../interfaces"
import Set from "../CS6.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Lance',
		ja: 'Lance',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 338783
		}
	}],
}

export default card
