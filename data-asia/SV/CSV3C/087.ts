import { Card } from "../../../interfaces"
import Set from "../CSV3C"

const card: Card = {
	set: Set,

	name: {
		en: 'Maschiff',
		ja: 'Maschiff',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337324
		}
	}],
}

export default card
