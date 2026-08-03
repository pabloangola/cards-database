import { Card } from "../../../interfaces"
import Set from "../Cs55"

const card: Card = {
	set: Set,

	name: {
		en: 'Regice',
		ja: 'Regice',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349380
		}
	}],
}

export default card
