import { Card } from "../../../interfaces"
import Set from "../Cs6b"

const card: Card = {
	set: Set,

	name: {
		en: 'Pangoro',
		ja: 'Pangoro',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 346049
		}
	}],
}

export default card
