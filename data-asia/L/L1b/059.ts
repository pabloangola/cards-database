import { Card } from "../../../interfaces"
import Set from "../L1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Teddiursa',
		ja: 'Teddiursa',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142707
		}
	}],
}

export default card
