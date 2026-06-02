import { Card } from "../../../interfaces"
import Set from "../CS1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Munna',
		ja: 'Munna',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369442
		}
	}],
}

export default card
