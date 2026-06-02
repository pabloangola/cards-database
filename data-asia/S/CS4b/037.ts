import { Card } from "../../../interfaces"
import Set from "../CS4b"

const card: Card = {
	set: Set,

	name: {
		en: 'Eiscue',
		ja: 'Eiscue',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337462
		}
	}],
}

export default card
