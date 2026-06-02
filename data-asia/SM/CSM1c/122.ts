import { Card } from "../../../interfaces"
import Set from "../CSM1c"

const card: Card = {
	set: Set,

	name: {
		en: 'Counter Catcher',
		ja: 'Counter Catcher',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370328
		}
	}],
}

export default card
