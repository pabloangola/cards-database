import { Card } from "../../../interfaces"
import Set from "../Cs5d"

const card: Card = {
	set: Set,

	name: {
		en: 'Hippopotas',
		ja: 'Hippopotas',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 373520
		}
	}],
}

export default card
