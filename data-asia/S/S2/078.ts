import { Card } from "../../../interfaces"
import Set from "../S2"

const card: Card = {
	set: Set,

	name: {
		en: 'Chatot',
		ja: 'Chatot',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 141433
		}
	}],
}

export default card
