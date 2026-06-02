import { Card } from "../../../interfaces"
import Set from "../CSM2c"

const card: Card = {
	set: Set,

	name: {
		en: 'Poké Maniac',
		ja: 'Poké Maniac',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 353714
		}
	}],
}

export default card
