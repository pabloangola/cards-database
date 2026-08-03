import { Card } from "../../../interfaces"
import Set from "../Cs5a"

const card: Card = {
	set: Set,

	name: {
		en: 'Kamado',
		ja: 'Kamado',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347304
		}
	}],
}

export default card
