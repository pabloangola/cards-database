import { Card } from "../../../interfaces"
import Set from "../XY4"

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
			cardtrader: 140805
		}
	}],
}

export default card
