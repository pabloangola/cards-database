import { Card } from "../../../interfaces"
import Set from "../SM8"

const card: Card = {
	set: Set,

	name: {
		en: 'Pineco',
		ja: 'Pineco',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 143213
		}
	}],
}

export default card
