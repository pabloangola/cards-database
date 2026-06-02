import { Card } from "../../../interfaces"
import Set from "../CS3b"

const card: Card = {
	set: Set,

	name: {
		en: 'Aron',
		ja: 'Aron',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 368789
		}
	}],
}

export default card
