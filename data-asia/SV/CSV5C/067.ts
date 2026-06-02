import { Card } from "../../../interfaces"
import Set from "../CSV5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Gabite',
		ja: 'Gabite',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 350134
		}
	}],
}

export default card
