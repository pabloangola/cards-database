import { Card } from "../../../interfaces"
import Set from "../SM2K"

const card: Card = {
	set: Set,

	name: {
		en: 'Hala',
		ja: 'Hala',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139989
		}
	}],
}

export default card
