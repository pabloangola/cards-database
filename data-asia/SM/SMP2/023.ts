import { Card } from "../../../interfaces"
import Set from "../SMP2"

const card: Card = {
	set: Set,

	name: {
		en: 'Ditto',
		ja: 'Ditto',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 255297
		}
	}],
}

export default card
