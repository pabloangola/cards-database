import { Card } from "../../../interfaces"
import Set from "../BW1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Max Potion',
		ja: 'Max Potion',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136047
		}
	}],
}

export default card
