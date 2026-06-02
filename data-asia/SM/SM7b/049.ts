import { Card } from "../../../interfaces"
import Set from "../SM7b"

const card: Card = {
	set: Set,

	name: {
		en: 'Mina',
		ja: 'Mina',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 282065
		}
	}],
}

export default card
