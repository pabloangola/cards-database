import { Card } from "../../../interfaces"
import Set from "../CS1aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Guzma',
		ja: 'Guzma',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369969
		}
	}],
}

export default card
