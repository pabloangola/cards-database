import { Card } from "../../../interfaces"
import Set from "../CP4"

const card: Card = {
	set: Set,

	name: {
		en: 'Cubchoo',
		ja: 'Cubchoo',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 271573
		}
	}],
}

export default card
