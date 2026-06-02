import { Card } from "../../../interfaces"
import Set from "../SM2K"

const card: Card = {
	set: Set,

	name: {
		en: 'Hala',
		ja: 'Hala',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139995
		}
	}],
}

export default card
