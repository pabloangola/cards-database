import { Card } from "../../../interfaces"
import Set from "../S8ag"

const card: Card = {
	set: Set,

	name: {
		en: 'Pikachu',
		ja: 'Pikachu',
	},

	category: 'Pokemon',
	rarity: 'Promo',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 201793
		}
	}],
}

export default card
