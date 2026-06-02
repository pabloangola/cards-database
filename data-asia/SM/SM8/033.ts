import { Card } from "../../../interfaces"
import Set from "../SM8"

const card: Card = {
	set: Set,

	name: {
		en: 'Mareep',
		ja: 'Mareep',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 143234
		}
	}],
}

export default card
