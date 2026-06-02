import { Card } from "../../../interfaces"
import Set from "../SM1S"

const card: Card = {
	set: Set,

	name: {
		en: 'Rotom Dex',
		ja: 'Rotom Dex',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136660
		}
	}],
}

export default card
