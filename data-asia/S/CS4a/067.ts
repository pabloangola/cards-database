import { Card } from "../../../interfaces"
import Set from "../CS4a"

const card: Card = {
	set: Set,

	name: {
		en: 'Florges',
		ja: 'Florges',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337021
		}
	}],
}

export default card
