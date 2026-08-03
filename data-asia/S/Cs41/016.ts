import { Card } from "../../../interfaces"
import Set from "../Cs41"

const card: Card = {
	set: Set,

	name: {
		en: 'Pikachu V',
		ja: 'Pikachu V',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 342016
		}
	}],
}

export default card
