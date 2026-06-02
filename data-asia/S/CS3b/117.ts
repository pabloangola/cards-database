import { Card } from "../../../interfaces"
import Set from "../CS3b"

const card: Card = {
	set: Set,

	name: {
		en: 'Doctor',
		ja: 'Doctor',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 368818
		}
	}],
}

export default card
