import { Card } from "../../../interfaces"
import Set from "../Cs55"

const card: Card = {
	set: Set,

	name: {
		en: 'Wailord',
		ja: 'Wailord',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349379
		}
	}],
}

export default card
