import { Card } from "../../../interfaces"
import Set from "../CSV2C"

const card: Card = {
	set: Set,

	name: {
		en: 'Erika\'s Invitation',
		ja: 'Erika\'s Invitation',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 329941
		}
	}],
}

export default card
