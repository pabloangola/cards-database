import { Card } from "../../../interfaces"
import Set from "../Sgl"

const card: Card = {
	set: Set,

	name: {
		en: 'Lapras',
		ja: 'Lapras',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 158479
		}
	}],
}

export default card
