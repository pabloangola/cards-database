import { Card } from "../../../interfaces"
import Set from "../CS1bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Zweilous',
		ja: 'Zweilous',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369256
		}
	}],
}

export default card
