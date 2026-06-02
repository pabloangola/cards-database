import { Card } from "../../../interfaces"
import Set from "../CS1.5"

const card: Card = {
	set: Set,

	name: {
		en: 'Dottler',
		ja: 'Dottler',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 368966
		}
	}],
}

export default card
