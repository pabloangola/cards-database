import { Card } from "../../../interfaces"
import Set from "../CSV2C"

const card: Card = {
	set: Set,

	name: {
		en: 'Diglett',
		ja: 'Diglett',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 329823
		}
	}],
}

export default card
