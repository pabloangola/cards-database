import { Card } from "../../../interfaces"
import Set from "../SM12a"

const card: Card = {
	set: Set,

	name: {
		en: 'Pikipek',
		ja: 'Pikipek',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 260059
		}
	}],
}

export default card
