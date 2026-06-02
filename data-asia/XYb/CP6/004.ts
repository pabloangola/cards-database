import { Card } from "../../../interfaces"
import Set from "../CP6"

const card: Card = {
	set: Set,

	name: {
		en: 'Metapod',
		ja: 'Metapod',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 138139
		}
	}],
}

export default card
