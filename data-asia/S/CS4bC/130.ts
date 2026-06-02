import { Card } from "../../../interfaces"
import Set from "../CS4bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Stormy Mountains',
		ja: 'Stormy Mountains',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337740
		}
	}],
}

export default card
