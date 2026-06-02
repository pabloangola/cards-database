import { Card } from "../../../interfaces"
import Set from "../CS6aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Wallace',
		ja: 'Wallace',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345717
		}
	}],
}

export default card
