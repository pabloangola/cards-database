import { Card } from "../../../interfaces"
import Set from "../Cs6b"

const card: Card = {
	set: Set,

	name: {
		en: 'Glalie',
		ja: 'Glalie',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345919
		}
	}],
}

export default card
