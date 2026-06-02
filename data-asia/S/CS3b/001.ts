import { Card } from "../../../interfaces"
import Set from "../CS3b"

const card: Card = {
	set: Set,

	name: {
		en: 'Cherubi',
		ja: 'Cherubi',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349866
		}
	}],
}

export default card
