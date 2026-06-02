import { Card } from "../../../interfaces"
import Set from "../CSM2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Will',
		ja: 'Will',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 358183
		}
	}],
}

export default card
