import { Card } from "../../../interfaces"
import Set from "../S2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Liepard',
		ja: 'Liepard',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 277491
		}
	}],
}

export default card
