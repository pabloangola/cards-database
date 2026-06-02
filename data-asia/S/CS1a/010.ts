import { Card } from "../../../interfaces"
import Set from "../CS1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Qwilfish',
		ja: 'Qwilfish',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369391
		}
	}],
}

export default card
