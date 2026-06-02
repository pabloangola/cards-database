import { Card } from "../../../interfaces"
import Set from "../Pt4"

const card: Card = {
	set: Set,

	name: {
		en: 'Ultimate Zone',
		ja: 'Ultimate Zone',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135252
		}
	}],
}

export default card
