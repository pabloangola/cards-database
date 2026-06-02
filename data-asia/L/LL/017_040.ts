import { Card } from "../../../interfaces"
import Set from "../LL"

const card: Card = {
	set: Set,

	name: {
		en: 'Mr. Mime',
		ja: 'Mr. Mime',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 146373
		}
	}],
}

export default card
