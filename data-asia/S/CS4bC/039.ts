import { Card } from "../../../interfaces"
import Set from "../CS4bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Flaaffy',
		ja: 'Flaaffy',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337493
		}
	}],
}

export default card
