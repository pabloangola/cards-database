import { Card } from "../../../interfaces"
import Set from "../CS3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Psyduck',
		ja: 'Psyduck',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349472
		}
	}],
}

export default card
