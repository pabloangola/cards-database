import { Card } from "../../../interfaces"
import Set from "../CS4b"

const card: Card = {
	set: Set,

	name: {
		en: 'Magcargo',
		ja: 'Magcargo',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337442
		}
	}],
}

export default card
