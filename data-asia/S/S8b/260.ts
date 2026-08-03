import { Card } from "../../../interfaces"
import Set from "../S8b"

const card: Card = {
	set: Set,

	name: {
		en: 'Cook',
		ja: 'Cook',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 233119
		}
	}],
}

export default card
