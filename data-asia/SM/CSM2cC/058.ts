import { Card } from "../../../interfaces"
import Set from "../CSM2cC"

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
			cardtrader: 353390
		}
	}],
}

export default card
