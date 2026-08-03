import { Card } from "../../../interfaces"
import Set from "../Cs6a"

const card: Card = {
	set: Set,

	name: {
		en: 'Worker',
		ja: 'Worker',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345714
		}
	}],
}

export default card
