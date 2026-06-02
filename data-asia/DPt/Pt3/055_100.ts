import { Card } from "../../../interfaces"
import Set from "../Pt3"

const card: Card = {
	set: Set,

	name: {
		en: 'Primeape',
		ja: 'Primeape',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135936
		}
	}],
}

export default card
