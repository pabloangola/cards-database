import { Card } from "../../../interfaces"
import Set from "../CSV7C"

const card: Card = {
	set: Set,

	name: {
		en: 'Palafin',
		ja: 'Palafin',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 367520
		}
	}],
}

export default card
