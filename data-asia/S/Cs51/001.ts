import { Card } from "../../../interfaces"
import Set from "../Cs51"

const card: Card = {
	set: Set,

	name: {
		en: 'Sobble',
		ja: 'Sobble',
	},

	category: 'Pokemon',
	rarity: 'Promo',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 329737
		}
	}],
}

export default card
