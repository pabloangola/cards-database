import { Card } from "../../../interfaces"
import Set from "../SM8b"

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
			cardtrader: 138708
		}
	}],
}

export default card
