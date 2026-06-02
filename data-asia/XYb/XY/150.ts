import { Card } from "../../../interfaces"
import Set from "../XY"

const card: Card = {
	set: Set,

	name: {
		en: 'Lysandre',
		ja: 'Lysandre',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 284944
		}
	}],
}

export default card
