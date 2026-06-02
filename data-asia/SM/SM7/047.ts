import { Card } from "../../../interfaces"
import Set from "../SM7"

const card: Card = {
	set: Set,

	name: {
		en: 'Baltoy',
		ja: 'Baltoy',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142530
		}
	}],
}

export default card
