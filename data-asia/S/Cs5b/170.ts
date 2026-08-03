import { Card } from "../../../interfaces"
import Set from "../Cs5b"

const card: Card = {
	set: Set,

	name: {
		en: 'Choy',
		ja: 'Choy',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 346979
		}
	}],
}

export default card
