import { Card } from "../../../interfaces"
import Set from "../CSM1bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Mars',
		ja: 'Mars',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370181
		}
	}],
}

export default card
