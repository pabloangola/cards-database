import { Card } from "../../../interfaces"
import Set from "../Cs6b"

const card: Card = {
	set: Set,

	name: {
		en: 'Chimecho',
		ja: 'Chimecho',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345966
		}
	}],
}

export default card
