import { Card } from "../../../interfaces"
import Set from "../L2"

const card: Card = {
	set: Set,

	name: {
		en: 'Slugma',
		ja: 'Slugma',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 141636
		}
	}],
}

export default card
