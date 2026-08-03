import { Card } from "../../../interfaces"
import Set from "../Cs51"

const card: Card = {
	set: Set,

	name: {
		en: 'Gym Trainer',
		ja: 'Gym Trainer',
	},

	category: 'Trainer',
	rarity: 'Promo',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 329749
		}
	}],
}

export default card
