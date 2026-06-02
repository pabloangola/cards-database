import { Card } from "../../../interfaces"
import Set from "../CSM1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Rotom',
		ja: 'Rotom',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370062
		}
	}],
}

export default card
