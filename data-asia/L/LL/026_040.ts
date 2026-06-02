import { Card } from "../../../interfaces"
import Set from "../LL"

const card: Card = {
	set: Set,

	name: {
		en: 'Lucario',
		ja: 'Lucario',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 146383
		}
	}],
}

export default card
