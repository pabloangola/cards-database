import { Card } from "../../../interfaces"
import Set from "../CSV6C"

const card: Card = {
	set: Set,

	name: {
		en: 'Nacli',
		ja: 'Nacli',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 361391
		}
	}],
}

export default card
