import { Card } from "../../../interfaces"
import Set from "../SM8a"

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
			cardtrader: 254789
		}
	}],
}

export default card
