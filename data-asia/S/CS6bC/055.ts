import { Card } from "../../../interfaces"
import Set from "../CS6bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Indeedee',
		ja: 'Indeedee',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345985
		}
	}],
}

export default card
