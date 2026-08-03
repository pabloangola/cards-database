import { Card } from "../../../interfaces"
import Set from "../Cs1"

const card: Card = {
	set: Set,

	name: {
		en: 'Munna',
		ja: 'Munna',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 385476
		}
	}],
}

export default card
