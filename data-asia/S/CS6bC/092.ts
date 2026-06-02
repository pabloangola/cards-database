import { Card } from "../../../interfaces"
import Set from "../CS6bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Liepard',
		ja: 'Liepard',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 346045
		}
	}],
}

export default card
