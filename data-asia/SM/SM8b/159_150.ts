import { Card } from "../../../interfaces"
import Set from "../SM8b"

const card: Card = {
	set: Set,

	name: {
		en: 'Evelyn',
		ja: 'Evelyn',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 138714
		}
	}],
}

export default card
