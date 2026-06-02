import { Card } from "../../../interfaces"
import Set from "../CS4b"

const card: Card = {
	set: Set,

	name: {
		en: 'Appletun',
		ja: 'Appletun',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337715
		}
	}],
}

export default card
