import { Card } from "../../../interfaces"
import Set from "../SM4A"

const card: Card = {
	set: Set,

	name: {
		en: 'Primeape',
		ja: 'Primeape',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144046
		}
	}],
}

export default card
