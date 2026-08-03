import { Card } from "../../../interfaces"
import Set from "../Sd"

const card: Card = {
	set: Set,

	name: {
		en: 'Ledyba',
		ja: 'Ledyba',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 284044
		}
	}],
}

export default card
