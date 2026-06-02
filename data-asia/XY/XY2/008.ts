import { Card } from "../../../interfaces"
import Set from "../XY2"

const card: Card = {
	set: Set,

	name: {
		en: 'Roselia',
		ja: 'Roselia',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144238
		}
	}],
}

export default card
