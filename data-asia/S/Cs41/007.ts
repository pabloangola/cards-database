import { Card } from "../../../interfaces"
import Set from "../Cs41"

const card: Card = {
	set: Set,

	name: {
		en: 'Gym Trainer',
		ja: 'Gym Trainer',
	},

	category: 'Trainer',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 341998
		}
	}],
}

export default card
