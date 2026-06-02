import { Card } from "../../../interfaces"
import Set from "../CS1aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Poipole',
		ja: 'Poipole',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369846
		}
	}],
}

export default card
