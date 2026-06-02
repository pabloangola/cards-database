import { Card } from "../../../interfaces"
import Set from "../LL"

const card: Card = {
	set: Set,

	name: {
		en: 'Dratini',
		ja: 'Dratini',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 146501
		}
	}],
}

export default card
