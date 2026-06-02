import { Card } from "../../../interfaces"
import Set from "../XY"

const card: Card = {
	set: Set,

	name: {
		en: 'Golbat',
		ja: 'Golbat',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 284693
		}
	}],
}

export default card
