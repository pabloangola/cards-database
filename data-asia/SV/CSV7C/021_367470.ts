import { Card } from "../../../interfaces"
import Set from "../CSV7C"

const card: Card = {
	set: Set,

	name: {
		en: 'Shaymin',
		ja: 'Shaymin',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 367470
		}
	}],
}

export default card
