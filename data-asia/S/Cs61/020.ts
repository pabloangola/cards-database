import { Card } from "../../../interfaces"
import Set from "../Cs61"

const card: Card = {
	set: Set,

	name: {
		en: 'Furisode Girl',
		ja: 'Furisode Girl',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349065
		}
	}],
}

export default card
