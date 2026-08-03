import { Card } from "../../../interfaces"
import Set from "../Cs5a"

const card: Card = {
	set: Set,

	name: {
		en: 'Mr. Mime',
		ja: 'Mr. Mime',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347155
		}
	}],
}

export default card
