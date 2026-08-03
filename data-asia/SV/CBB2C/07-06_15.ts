import { Card } from "../../../interfaces"
import Set from "../CBB2C"

const card: Card = {
	set: Set,

	name: {
		en: 'Leafeon',
		ja: 'Leafeon',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 333450
		}
	}],
}

export default card
