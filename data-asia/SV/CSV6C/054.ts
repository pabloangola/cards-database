import { Card } from "../../../interfaces"
import Set from "../CSV6C"

const card: Card = {
	set: Set,

	name: {
		en: 'Woobat',
		ja: 'Woobat',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 361370
		}
	}],
}

export default card
