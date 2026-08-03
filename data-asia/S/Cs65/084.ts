import { Card } from "../../../interfaces"
import Set from "../Cs65"

const card: Card = {
	set: Set,

	name: {
		en: 'Lance',
		ja: 'Lance',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 338810
		}
	}],
}

export default card
