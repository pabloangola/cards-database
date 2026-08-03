import { Card } from "../../../interfaces"
import Set from "../SV8"

const card: Card = {
	set: Set,

	name: {
		en: 'Yamask',
		ja: 'Yamask',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 305442
		}
	}],
}

export default card
