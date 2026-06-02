import { Card } from "../../../interfaces"
import Set from "../CSV3C"

const card: Card = {
	set: Set,

	name: {
		en: 'Falkner',
		ja: 'Falkner',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337387
		}
	}],
}

export default card
