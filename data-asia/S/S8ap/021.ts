import { Card } from "../../../interfaces"
import Set from "../S8ap"

const card: Card = {
	set: Set,

	name: {
		en: 'Zekrom',
		ja: 'Zekrom',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 171214
		}
	}],
}

export default card
