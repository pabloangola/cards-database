import { Card } from "../../../interfaces"
import Set from "../CS5bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Ivysaur',
		ja: 'Ivysaur',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 311031
		}
	}],
}

export default card
