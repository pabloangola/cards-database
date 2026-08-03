import { Card } from "../../../interfaces"
import Set from "../Cs5b"

const card: Card = {
	set: Set,

	name: {
		en: 'Adaman',
		ja: 'Adaman',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 346978
		}
	}],
}

export default card
