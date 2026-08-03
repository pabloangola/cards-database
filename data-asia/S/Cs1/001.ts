import { Card } from "../../../interfaces"
import Set from "../Cs1"

const card: Card = {
	set: Set,

	name: {
		en: 'Snivy',
		ja: 'Snivy',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 385475
		}
	}],
}

export default card
