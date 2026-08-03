import { Card } from "../../../interfaces"
import Set from "../Cs5d"

const card: Card = {
	set: Set,

	name: {
		en: 'Barry',
		ja: 'Barry',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 373598
		}
	}],
}

export default card
