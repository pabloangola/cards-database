import { Card } from "../../../interfaces"
import Set from "../CSV2C"

const card: Card = {
	set: Set,

	name: {
		en: 'Hariyama',
		ja: 'Hariyama',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 329827
		}
	}],
}

export default card
