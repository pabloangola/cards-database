import { Card } from "../../../interfaces"
import Set from "../CSM2.5"

const card: Card = {
	set: Set,

	name: {
		en: 'Roxie',
		ja: 'Roxie',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369645
		}
	}],
}

export default card
