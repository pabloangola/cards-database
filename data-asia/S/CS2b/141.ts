import { Card } from "../../../interfaces"
import Set from "../CS2b"

const card: Card = {
	set: Set,

	name: {
		en: 'Nessa',
		ja: 'Nessa',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 367002
		}
	}],
}

export default card
