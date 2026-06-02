import { Card } from "../../../interfaces"
import Set from "../CSV4C"

const card: Card = {
	set: Set,

	name: {
		en: 'Primeape',
		ja: 'Primeape',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 343614
		}
	}],
}

export default card
