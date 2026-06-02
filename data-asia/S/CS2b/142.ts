import { Card } from "../../../interfaces"
import Set from "../CS2b"

const card: Card = {
	set: Set,

	name: {
		en: 'Hero\'s Medal',
		ja: 'Hero\'s Medal',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 367003
		}
	}],
}

export default card
