import { Card } from "../../../interfaces"
import Set from "../CS1aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Jasmine',
		ja: 'Jasmine',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369929
		}
	}],
}

export default card
