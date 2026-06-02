import { Card } from "../../../interfaces"
import Set from "../CS5.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Roxanne',
		ja: 'Roxanne',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349426
		}
	}],
}

export default card
