import { Card } from "../../../interfaces"
import Set from "../Cs5d"

const card: Card = {
	set: Set,

	name: {
		en: 'Dartrix',
		ja: 'Dartrix',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 373471
		}
	}],
}

export default card
