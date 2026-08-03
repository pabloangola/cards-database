import { Card } from "../../../interfaces"
import Set from "../Sd"

const card: Card = {
	set: Set,

	name: {
		en: 'Luxio',
		ja: 'Luxio',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 284079
		}
	}],
}

export default card
