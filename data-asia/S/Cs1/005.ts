import { Card } from "../../../interfaces"
import Set from "../Cs1"

const card: Card = {
	set: Set,

	name: {
		en: 'Blitzle',
		ja: 'Blitzle',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 385479
		}
	}],
}

export default card
