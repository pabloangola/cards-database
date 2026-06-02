import { Card } from "../../../interfaces"
import Set from "../SM7a"

const card: Card = {
	set: Set,

	name: {
		en: 'Custom Catcher',
		ja: 'Custom Catcher',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 293531
		}
	}],
}

export default card
