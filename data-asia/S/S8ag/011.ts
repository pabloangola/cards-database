import { Card } from "../../../interfaces"
import Set from "../S8ag"

const card: Card = {
	set: Set,

	name: {
		en: 'Poké Ball',
		ja: 'Poké Ball',
	},

	category: 'Pokemon',
	rarity: 'Promo',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 315363
		}
	}],
}

export default card
