import { Card } from "../../../interfaces"
import Set from "../CS1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Meditite',
		ja: 'Meditite',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369468
		}
	}],
}

export default card
