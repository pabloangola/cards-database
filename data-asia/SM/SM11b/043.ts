import { Card } from "../../../interfaces"
import Set from "../SM11b"

const card: Card = {
	set: Set,

	name: {
		en: 'Lillie\'s Poké Doll',
		ja: 'Lillie\'s Poké Doll',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 255189
		}
	}],
}

export default card
