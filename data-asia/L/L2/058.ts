import { Card } from "../../../interfaces"
import Set from "../L2"

const card: Card = {
	set: Set,

	name: {
		en: 'Eevee',
		ja: 'Eevee',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 141728
		}
	}],
}

export default card
