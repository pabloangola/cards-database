import { Card } from "../../../interfaces"
import Set from "../Sek"

const card: Card = {
	set: Set,

	name: {
		en: 'Marnie',
		ja: 'Marnie',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 154088
		}
	}],
}

export default card
