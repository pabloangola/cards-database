import { Card } from "../../../interfaces"
import Set from "../SM4S"

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
			cardtrader: 135485
		}
	}],
}

export default card
