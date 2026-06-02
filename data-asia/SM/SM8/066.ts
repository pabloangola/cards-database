import { Card } from "../../../interfaces"
import Set from "../SM8"

const card: Card = {
	set: Set,

	name: {
		en: 'Chansey',
		ja: 'Chansey',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 143267
		}
	}],
}

export default card
