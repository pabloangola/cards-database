import { Card } from "../../../interfaces"
import Set from "../BW9"

const card: Card = {
	set: Set,

	name: {
		en: 'Iris',
		ja: 'Iris',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140153
		}
	}],
}

export default card
