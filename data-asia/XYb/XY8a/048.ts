import { Card } from "../../../interfaces"
import Set from "../XY8a"

const card: Card = {
	set: Set,

	name: {
		en: 'Doduo',
		ja: 'Doduo',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136100
		}
	}],
}

export default card
