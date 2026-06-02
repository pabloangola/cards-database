import { Card } from "../../../interfaces"
import Set from "../ADV4"

const card: Card = {
	set: Set,

	name: {
		en: 'Linoone',
		ja: 'Linoone',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140059
		}
	}],
}

export default card
