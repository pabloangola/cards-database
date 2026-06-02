import { Card } from "../../../interfaces"
import Set from "../ADV5"

const card: Card = {
	set: Set,

	name: {
		en: 'Zubat',
		ja: 'Zubat',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144085
		}
	}],
}

export default card
