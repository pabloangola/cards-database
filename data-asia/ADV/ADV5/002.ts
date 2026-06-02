import { Card } from "../../../interfaces"
import Set from "../ADV5"

const card: Card = {
	set: Set,

	name: {
		en: 'Golbat',
		ja: 'Golbat',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144086
		}
	}],
}

export default card
