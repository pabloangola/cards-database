import { Card } from "../../../interfaces"
import Set from "../ADV5"

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
			cardtrader: 144143
		}
	}],
}

export default card
