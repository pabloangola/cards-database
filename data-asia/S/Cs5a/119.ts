import { Card } from "../../../interfaces"
import Set from "../Cs5a"

const card: Card = {
	set: Set,

	name: {
		en: 'Kindler',
		ja: 'Kindler',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347252
		}
	}],
}

export default card
