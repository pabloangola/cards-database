import { Card } from "../../../interfaces"
import Set from "../CS4.5"

const card: Card = {
	set: Set,

	name: {
		en: 'Toy Catcher',
		ja: 'Toy Catcher',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347703
		}
	}],
}

export default card
