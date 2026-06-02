import { Card } from "../../../interfaces"
import Set from "../SM9"

const card: Card = {
	set: Set,

	name: {
		en: 'Magikarp',
		ja: 'Magikarp',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 143414
		}
	}],
}

export default card
