import { Card } from "../../../interfaces"
import Set from "../SC"

const card: Card = {
	set: Set,

	name: {
		en: 'Elesa',
		ja: 'Elesa',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 272938
		}
	}],
}

export default card
