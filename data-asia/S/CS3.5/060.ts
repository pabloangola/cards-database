import { Card } from "../../../interfaces"
import Set from "../CS3.5"

const card: Card = {
	set: Set,

	name: {
		en: 'Klara',
		ja: 'Klara',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 360823
		}
	}],
}

export default card
