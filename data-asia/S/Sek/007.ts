import { Card } from "../../../interfaces"
import Set from "../Sek"

const card: Card = {
	set: Set,

	name: {
		en: 'Volcanion',
		ja: 'Volcanion',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 154076
		}
	}],
}

export default card
