import { Card } from "../../../interfaces"
import Set from "../Cs65"

const card: Card = {
	set: Set,

	name: {
		en: 'Tool Box',
		ja: 'Tool Box',
	},

	category: 'Trainer',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 338793
		}
	}],
}

export default card
