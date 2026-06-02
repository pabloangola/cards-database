import { Card } from "../../../interfaces"
import Set from "../SM5M"

const card: Card = {
	set: Set,

	name: {
		en: 'Cynthia',
		ja: 'Cynthia',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 143936
		}
	}],
}

export default card
