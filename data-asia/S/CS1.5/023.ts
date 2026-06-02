import { Card } from "../../../interfaces"
import Set from "../CS1.5"

const card: Card = {
	set: Set,

	name: {
		en: 'Sinistea',
		ja: 'Sinistea',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 368985
		}
	}],
}

export default card
