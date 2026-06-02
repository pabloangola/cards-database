import { Card } from "../../../interfaces"
import Set from "../CS1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Scyther',
		ja: 'Scyther',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369188
		}
	}],
}

export default card
