import { Card } from "../../../interfaces"
import Set from "../SC"

const card: Card = {
	set: Set,

	name: {
		en: 'Minccino',
		ja: 'Minccino',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 272936
		}
	}],
}

export default card
