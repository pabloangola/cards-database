import { Card } from "../../../interfaces"
import Set from "../CS4b"

const card: Card = {
	set: Set,

	name: {
		en: 'Schoolboy',
		ja: 'Schoolboy',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337752
		}
	}],
}

export default card
