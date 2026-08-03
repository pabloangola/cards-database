import { Card } from "../../../interfaces"
import Set from "../Cs65"

const card: Card = {
	set: Set,

	name: {
		en: 'Guard Energy',
		ja: 'Guard Energy',
	},

	category: 'Energy',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 338800
		}
	}],
}

export default card
