import { Card } from "../../../interfaces"
import Set from "../Cs51"

const card: Card = {
	set: Set,

	name: {
		en: 'Gallade',
		ja: 'Gallade',
	},

	category: 'Pokemon',
	rarity: 'Promo',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 329758
		}
	}],
}

export default card
