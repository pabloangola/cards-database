import { Card } from "../../../interfaces"
import Set from "../ADV4"

const card: Card = {
	set: Set,

	name: {
		en: 'Pelipper',
		ja: 'Pelipper',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140033
		}
	}],
}

export default card
