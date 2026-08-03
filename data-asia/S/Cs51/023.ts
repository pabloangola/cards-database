import { Card } from "../../../interfaces"
import Set from "../Cs51"

const card: Card = {
	set: Set,

	name: {
		en: 'Battle VIP Pass',
		ja: 'Battle VIP Pass',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 311055
		}
	}],
}

export default card
