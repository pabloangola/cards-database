import { Card } from "../../../interfaces"
import Set from "../CSV3C"

const card: Card = {
	set: Set,

	name: {
		en: 'Surskit',
		ja: 'Surskit',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337238
		}
	}],
}

export default card
