import { Card } from "../../../interfaces"
import Set from "../M2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Psyduck',
		ja: 'Psyduck',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 359125
		}
	}],
}

export default card
