import { Card } from "../../../interfaces"
import Set from "../SM10"

const card: Card = {
	set: Set,

	name: {
		en: 'Gastly',
		ja: 'Gastly',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 137341
		}
	}],
}

export default card
