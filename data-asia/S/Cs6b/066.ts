import { Card } from "../../../interfaces"
import Set from "../Cs6b"

const card: Card = {
	set: Set,

	name: {
		en: 'Medicham',
		ja: 'Medicham',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345998
		}
	}],
}

export default card
