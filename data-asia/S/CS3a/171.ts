import { Card } from "../../../interfaces"
import Set from "../CS3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Agatha',
		ja: 'Agatha',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349762
		}
	}],
}

export default card
