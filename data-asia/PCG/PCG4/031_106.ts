import { Card } from "../../../interfaces"
import Set from "../PCG4"

const card: Card = {
	set: Set,

	name: {
		en: 'Smoochum',
		ja: 'Smoochum',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139117
		}
	}],
}

export default card
