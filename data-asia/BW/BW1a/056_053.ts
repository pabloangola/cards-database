import { Card } from "../../../interfaces"
import Set from "../BW1a"

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
			cardtrader: 136052
		}
	}],
}

export default card
