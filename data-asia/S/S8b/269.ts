import { Card } from "../../../interfaces"
import Set from "../S8b"

const card: Card = {
	set: Set,

	name: {
		en: 'Opal',
		ja: 'Opal',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 233128
		}
	}],
}

export default card
