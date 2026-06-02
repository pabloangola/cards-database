import { Card } from "../../../interfaces"
import Set from "../L3"

const card: Card = {
	set: Set,

	name: {
		en: 'Porygon',
		ja: 'Porygon',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136341
		}
	}],
}

export default card
