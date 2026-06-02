import { Card } from "../../../interfaces"
import Set from "../CS4aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Copycat',
		ja: 'Copycat',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337123
		}
	}],
}

export default card
