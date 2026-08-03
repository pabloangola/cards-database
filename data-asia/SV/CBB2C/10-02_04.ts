import { Card } from "../../../interfaces"
import Set from "../CBB2C"

const card: Card = {
	set: Set,

	name: {
		en: 'Level Ball',
		ja: 'Level Ball',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 329900
		}
	}],
}

export default card
