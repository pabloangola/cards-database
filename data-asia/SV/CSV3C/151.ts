import { Card } from "../../../interfaces"
import Set from "../CSV3C"

const card: Card = {
	set: Set,

	name: {
		en: 'Giacomo',
		ja: 'Giacomo',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337409
		}
	}],
}

export default card
