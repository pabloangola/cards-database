import { Card } from "../../../interfaces"
import Set from "../CS1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Raboot',
		ja: 'Raboot',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369230
		}
	}],
}

export default card
