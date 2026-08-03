import { Card } from "../../../interfaces"
import Set from "../CBB4C"

const card: Card = {
	set: Set,

	name: {
		en: 'Eevee',
		ja: 'Eevee',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 372859
		}
	}],
}

export default card
