import { Card } from "../../../interfaces"
import Set from "../CS3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Peonia',
		ja: 'Peonia',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349743
		}
	}],
}

export default card
