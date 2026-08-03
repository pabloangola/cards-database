import { Card } from "../../../interfaces"
import Set from "../Cs51"

const card: Card = {
	set: Set,

	name: {
		en: 'Eevee',
		ja: 'Eevee',
	},

	category: 'Pokemon',
	rarity: 'Promo',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 329740
		}
	}],
}

export default card
