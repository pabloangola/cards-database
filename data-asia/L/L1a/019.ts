import { Card } from "../../../interfaces"
import Set from "../L1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Staryu',
		ja: 'Staryu',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139485
		}
	}],
}

export default card
