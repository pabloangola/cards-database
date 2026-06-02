import { Card } from "../../../interfaces"
import Set from "../SM12a"

const card: Card = {
	set: Set,

	name: {
		en: 'Morty',
		ja: 'Morty',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 260557
		}
	}],
}

export default card
