import { Card } from "../../../interfaces"
import Set from "../Sgl"

const card: Card = {
	set: Set,

	name: {
		en: 'Hawlucha',
		ja: 'Hawlucha',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 158500
		}
	}],
}

export default card
