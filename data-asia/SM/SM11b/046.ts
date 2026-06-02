import { Card } from "../../../interfaces"
import Set from "../SM11b"

const card: Card = {
	set: Set,

	name: {
		en: 'Roxie',
		ja: 'Roxie',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 255192
		}
	}],
}

export default card
