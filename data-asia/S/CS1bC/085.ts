import { Card } from "../../../interfaces"
import Set from "../CS1bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Aron',
		ja: 'Aron',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369267
		}
	}],
}

export default card
