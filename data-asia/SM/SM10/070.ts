import { Card } from "../../../interfaces"
import Set from "../SM10"

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
			cardtrader: 137381
		}
	}],
}

export default card
