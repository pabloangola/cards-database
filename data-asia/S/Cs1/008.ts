import { Card } from "../../../interfaces"
import Set from "../Cs1"

const card: Card = {
	set: Set,

	name: {
		en: 'Sandile',
		ja: 'Sandile',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 385482
		}
	}],
}

export default card
