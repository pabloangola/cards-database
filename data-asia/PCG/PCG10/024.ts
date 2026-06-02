import { Card } from "../../../interfaces"
import Set from "../PCG10"

const card: Card = {
	set: Set,

	name: {
		en: 'Raichu',
		ja: 'Raichu',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144435
		}
	}],
}

export default card
