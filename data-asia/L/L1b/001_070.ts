import { Card } from "../../../interfaces"
import Set from "../L1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Caterpie',
		ja: 'Caterpie',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142596
		}
	}],
}

export default card
