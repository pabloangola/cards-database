import { Card } from "../../../interfaces"
import Set from "../PCG10"

const card: Card = {
	set: Set,

	name: {
		en: 'Bagon',
		ja: 'Bagon',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144490
		}
	}],
}

export default card
