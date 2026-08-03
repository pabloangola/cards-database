import { Card } from "../../../interfaces"
import Set from "../Sgl"

const card: Card = {
	set: Set,

	name: {
		en: 'Lopunny',
		ja: 'Lopunny',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 158497
		}
	}],
}

export default card
