import { Card } from "../../../interfaces"
import Set from "../L3"

const card: Card = {
	set: Set,

	name: {
		en: 'Grumpig',
		ja: 'Grumpig',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136290
		}
	}],
}

export default card
