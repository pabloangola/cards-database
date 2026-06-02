import { Card } from "../../../interfaces"
import Set from "../XY8b"

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
			cardtrader: 141600
		}
	}],
}

export default card
