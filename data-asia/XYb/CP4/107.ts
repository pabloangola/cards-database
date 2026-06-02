import { Card } from "../../../interfaces"
import Set from "../CP4"

const card: Card = {
	set: Set,

	name: {
		en: 'Rare Candy',
		ja: 'Rare Candy',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 271946
		}
	}],
}

export default card
