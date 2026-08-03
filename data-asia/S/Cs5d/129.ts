import { Card } from "../../../interfaces"
import Set from "../Cs5d"

const card: Card = {
	set: Set,

	name: {
		en: 'Battle VIP Pass',
		ja: 'Battle VIP Pass',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 373585
		}
	}],
}

export default card
