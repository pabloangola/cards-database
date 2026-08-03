import { Card } from "../../../interfaces"
import Set from "../Cs45"

const card: Card = {
	set: Set,

	name: {
		en: 'Elemental Badge',
		ja: 'Elemental Badge',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347673
		}
	}],
}

export default card
