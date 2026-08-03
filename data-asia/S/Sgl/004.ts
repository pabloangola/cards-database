import { Card } from "../../../interfaces"
import Set from "../Sgl"

const card: Card = {
	set: Set,

	name: {
		en: 'Basculin',
		ja: 'Basculin',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 158482
		}
	}],
}

export default card
