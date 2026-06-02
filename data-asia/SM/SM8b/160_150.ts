import { Card } from "../../../interfaces"
import Set from "../SM8b"

const card: Card = {
	set: Set,

	name: {
		en: 'Nita',
		ja: 'Nita',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 138715
		}
	}],
}

export default card
