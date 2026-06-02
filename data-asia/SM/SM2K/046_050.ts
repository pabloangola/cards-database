import { Card } from "../../../interfaces"
import Set from "../SM2K"

const card: Card = {
	set: Set,

	name: {
		en: 'Komala',
		ja: 'Komala',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139986
		}
	}],
}

export default card
