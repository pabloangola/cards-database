import { Card } from "../../../interfaces"
import Set from "../CS3.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Hatterene',
		ja: 'Hatterene',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 360800
		}
	}],
}

export default card
