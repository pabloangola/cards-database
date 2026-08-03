import { Card } from "../../../interfaces"
import Set from "../S8b"

const card: Card = {
	set: Set,

	name: {
		en: 'Gardevoir',
		ja: 'Gardevoir',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 232818
		}
	}],
}

export default card
