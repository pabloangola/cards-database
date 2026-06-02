import { Card } from "../../../interfaces"
import Set from "../CS3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Golbat',
		ja: 'Golbat',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349579
		}
	}],
}

export default card
