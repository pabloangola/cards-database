import { Card } from "../../../interfaces"
import Set from "../SM1M"

const card: Card = {
	set: Set,

	name: {
		en: 'Pikipek',
		ja: 'Pikipek',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136564
		}
	}],
}

export default card
