import { Card } from "../../../interfaces"
import Set from "../L2"

const card: Card = {
	set: Set,

	name: {
		en: 'Vaporeon',
		ja: 'Vaporeon',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 141646
		}
	}],
}

export default card
