import { Card } from "../../../interfaces"
import Set from "../CS4bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Sidney',
		ja: 'Sidney',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337771
		}
	}],
}

export default card
