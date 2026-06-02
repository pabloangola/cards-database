import { Card } from "../../../interfaces"
import Set from "../SM8b"

const card: Card = {
	set: Set,

	name: {
		en: 'Eevee',
		ja: 'Eevee',
	},

	category: 'Pokemon',
	rarity: 'No Rarity',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 138660
		}
	}],
}

export default card
