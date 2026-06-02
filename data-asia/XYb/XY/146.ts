import { Card } from "../../../interfaces"
import Set from "../XY"

const card: Card = {
	set: Set,

	name: {
		en: 'Shauna',
		ja: 'Shauna',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 284948
		}
	}],
}

export default card
