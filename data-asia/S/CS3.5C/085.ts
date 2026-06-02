import { Card } from "../../../interfaces"
import Set from "../CS3.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Klara',
		ja: 'Klara',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 360848
		}
	}],
}

export default card
