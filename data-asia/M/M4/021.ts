import { Card } from "../../../interfaces"
import Set from "../M4"

const card: Card = {
	set: Set,

	name: {
		en: 'Frogadier',
		ja: 'Frogadier',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 377995
		}
	}],
}

export default card
