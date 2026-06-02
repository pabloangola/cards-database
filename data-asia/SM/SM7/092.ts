import { Card } from "../../../interfaces"
import Set from "../SM7"

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
			cardtrader: 142575
		}
	}],
}

export default card
