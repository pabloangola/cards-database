import { Card } from "../../../interfaces"
import Set from "../CS6aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Glameow',
		ja: 'Glameow',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345697
		}
	}],
}

export default card
