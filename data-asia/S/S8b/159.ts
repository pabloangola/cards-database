import { Card } from "../../../interfaces"
import Set from "../S8b"

const card: Card = {
	set: Set,

	name: {
		en: 'Café Master',
		ja: 'Café Master',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 232914
		}
	}],
}

export default card
