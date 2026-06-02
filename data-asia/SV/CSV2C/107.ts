import { Card } from "../../../interfaces"
import Set from "../CSV2C"

const card: Card = {
	set: Set,

	name: {
		en: 'Grafaiai ex',
		ja: 'Grafaiai ex',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 329878
		}
	}],
}

export default card
