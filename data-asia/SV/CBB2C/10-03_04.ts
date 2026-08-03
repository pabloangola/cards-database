import { Card } from "../../../interfaces"
import Set from "../CBB2C"

const card: Card = {
	set: Set,

	name: {
		en: 'Quick Ball',
		ja: 'Quick Ball',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 329899
		}
	}],
}

export default card
