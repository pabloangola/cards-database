import { Card } from "../../../interfaces"
import Set from "../SM1M"

const card: Card = {
	set: Set,

	name: {
		en: 'Lillie',
		ja: 'Lillie',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136574
		}
	}],
}

export default card
