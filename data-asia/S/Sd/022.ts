import { Card } from "../../../interfaces"
import Set from "../Sd"

const card: Card = {
	set: Set,

	name: {
		en: 'Horsea',
		ja: 'Horsea',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 284122
		}
	}],
}

export default card
