import { Card } from "../../../interfaces"
import Set from "../L1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Aipom',
		ja: 'Aipom',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142701
		}
	}],
}

export default card
