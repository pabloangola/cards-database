import { Card } from "../../../interfaces"
import Set from "../XY4"

const card: Card = {
	set: Set,

	name: {
		en: 'Pachirisu',
		ja: 'Pachirisu',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140800
		}
	}],
}

export default card
