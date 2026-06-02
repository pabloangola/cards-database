import { Card } from "../../../interfaces"
import Set from "../L1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Butterfree',
		ja: 'Butterfree',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142600
		}
	}],
}

export default card
