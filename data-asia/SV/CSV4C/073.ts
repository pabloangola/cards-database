import { Card } from "../../../interfaces"
import Set from "../CSV4C"

const card: Card = {
	set: Set,

	name: {
		en: 'Naclstack',
		ja: 'Naclstack',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 343622
		}
	}],
}

export default card
