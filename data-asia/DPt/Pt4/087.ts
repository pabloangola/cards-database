import { Card } from "../../../interfaces"
import Set from "../Pt4"

const card: Card = {
	set: Set,

	name: {
		en: 'Professor Oak\'s Visit',
		ja: 'Professor Oak\'s Visit',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135249
		}
	}],
}

export default card
