import { Card } from "../../../interfaces"
import Set from "../BW1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Pikachu',
		ja: 'Pikachu',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144230
		}
	}],
}

export default card
