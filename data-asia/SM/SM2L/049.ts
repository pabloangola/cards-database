import { Card } from "../../../interfaces"
import Set from "../SM2L"

const card: Card = {
	set: Set,

	name: {
		en: 'Mallow',
		ja: 'Mallow',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135309
		}
	}],
}

export default card
