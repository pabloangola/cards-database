import { Card } from "../../../interfaces"
import Set from "../SM5S"

const card: Card = {
	set: Set,

	name: {
		en: 'Mars',
		ja: 'Mars',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144016
		}
	}],
}

export default card
