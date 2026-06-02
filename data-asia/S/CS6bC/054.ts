import { Card } from "../../../interfaces"
import Set from "../CS6bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Tapu Lele',
		ja: 'Tapu Lele',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345984
		}
	}],
}

export default card
