import { Card } from "../../../interfaces"
import Set from "../L2"

const card: Card = {
	set: Set,

	name: {
		en: 'Grimer',
		ja: 'Grimer',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 141657
		}
	}],
}

export default card
