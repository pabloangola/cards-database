import { Card } from "../../../interfaces"
import Set from "../S1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Milo',
		ja: 'Milo',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 254589
		}
	}],
}

export default card
