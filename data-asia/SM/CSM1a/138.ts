import { Card } from "../../../interfaces"
import Set from "../CSM1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Guzma',
		ja: 'Guzma',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369923
		}
	}],
}

export default card
