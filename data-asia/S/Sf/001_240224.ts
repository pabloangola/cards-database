import { Card } from "../../../interfaces"
import Set from "../Sf"

const card: Card = {
	set: Set,

	name: {
		en: 'Snom',
		ja: 'Snom',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 240224
		}
	}],
}

export default card
