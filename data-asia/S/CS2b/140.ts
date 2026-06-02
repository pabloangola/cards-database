import { Card } from "../../../interfaces"
import Set from "../CS2b"

const card: Card = {
	set: Set,

	name: {
		en: 'Opal',
		ja: 'Opal',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 367001
		}
	}],
}

export default card
