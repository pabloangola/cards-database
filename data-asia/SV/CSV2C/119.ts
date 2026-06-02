import { Card } from "../../../interfaces"
import Set from "../CSV2C"

const card: Card = {
	set: Set,

	name: {
		en: 'Katy',
		ja: 'Katy',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 329942
		}
	}],
}

export default card
