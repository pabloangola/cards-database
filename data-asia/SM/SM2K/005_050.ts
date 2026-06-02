import { Card } from "../../../interfaces"
import Set from "../SM2K"

const card: Card = {
	set: Set,

	name: {
		en: 'Lilligant',
		ja: 'Lilligant',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139945
		}
	}],
}

export default card
