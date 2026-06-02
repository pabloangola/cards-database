import { Card } from "../../../interfaces"
import Set from "../CS4aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Gordie',
		ja: 'Gordie',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337122
		}
	}],
}

export default card
