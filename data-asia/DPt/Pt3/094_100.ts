import { Card } from "../../../interfaces"
import Set from "../Pt3"

const card: Card = {
	set: Set,

	name: {
		en: 'Battle Tower',
		ja: 'Battle Tower',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135975
		}
	}],
}

export default card
