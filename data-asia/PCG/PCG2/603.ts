import { Card } from "../../../interfaces"
import Set from "../PCG2"

const card: Card = {
	set: Set,

	name: {
		en: 'Shelgon',
		ja: 'Shelgon',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136430
		}
	}],
}

export default card
