import { Card } from "../../../interfaces"
import Set from "../Cs45"

const card: Card = {
	set: Set,

	name: {
		en: 'Zorua',
		ja: 'Zorua',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347654
		}
	}],
}

export default card
