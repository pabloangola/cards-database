import { Card } from "../../../interfaces"
import Set from "../SM8b"

const card: Card = {
	set: Set,

	name: {
		en: 'Morgan',
		ja: 'Morgan',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 138712
		}
	}],
}

export default card
