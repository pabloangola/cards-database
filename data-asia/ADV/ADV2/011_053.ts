import { Card } from "../../../interfaces"
import Set from "../ADV2"

const card: Card = {
	set: Set,

	name: {
		en: 'Cyndaquil',
		ja: 'Cyndaquil',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140370
		}
	}],
}

export default card
