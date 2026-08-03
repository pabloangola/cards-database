import { Card } from "../../../interfaces"
import Set from "../CBB2C"

const card: Card = {
	set: Set,

	name: {
		en: 'Poké Ball',
		ja: 'Poké Ball',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 333475
		}
	}],
}

export default card
