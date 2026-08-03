import { Card } from "../../../interfaces"
import Set from "../Cs41"

const card: Card = {
	set: Set,

	name: {
		en: 'Piers',
		ja: 'Piers',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 342001
		}
	}],
}

export default card
