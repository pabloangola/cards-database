import { Card } from "../../../interfaces"
import Set from "../Cs6b"

const card: Card = {
	set: Set,

	name: {
		en: 'Comfey',
		ja: 'Comfey',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345981
		}
	}],
}

export default card
