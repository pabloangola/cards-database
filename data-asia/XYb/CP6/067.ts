import { Card } from "../../../interfaces"
import Set from "../CP6"

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
			cardtrader: 138202
		}
	}],
}

export default card
