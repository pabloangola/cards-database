import { Card } from "../../../interfaces"
import Set from "../CSM1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Zebstrika',
		ja: 'Zebstrika',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370064
		}
	}],
}

export default card
