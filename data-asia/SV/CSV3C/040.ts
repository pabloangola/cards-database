import { Card } from "../../../interfaces"
import Set from "../CSV3C"

const card: Card = {
	set: Set,

	name: {
		en: 'Frigibax',
		ja: 'Frigibax',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337257
		}
	}],
}

export default card
