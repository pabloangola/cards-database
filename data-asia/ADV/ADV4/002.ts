import { Card } from "../../../interfaces"
import Set from "../ADV4"

const card: Card = {
	set: Set,

	name: {
		en: 'Arbok',
		ja: 'Arbok',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140004
		}
	}],
}

export default card
