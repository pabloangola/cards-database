import { Card } from "../../../interfaces"
import Set from "../SM7"

const card: Card = {
	set: Set,

	name: {
		en: 'Treecko',
		ja: 'Treecko',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142485
		}
	}],
}

export default card
