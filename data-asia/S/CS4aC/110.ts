import { Card } from "../../../interfaces"
import Set from "../CS4aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Kangaskhan',
		ja: 'Kangaskhan',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337070
		}
	}],
}

export default card
