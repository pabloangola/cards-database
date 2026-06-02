import { Card } from "../../../interfaces"
import Set from "../CP3"

const card: Card = {
	set: Set,

	name: {
		en: 'Wally',
		ja: 'Wally',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 271024
		}
	}],
}

export default card
