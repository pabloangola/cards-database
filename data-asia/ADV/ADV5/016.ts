import { Card } from "../../../interfaces"
import Set from "../ADV5"

const card: Card = {
	set: Set,

	name: {
		en: 'Vulpix',
		ja: 'Vulpix',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144100
		}
	}],
}

export default card
