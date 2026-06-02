import { Card } from "../../../interfaces"
import Set from "../BW6b"

const card: Card = {
	set: Set,

	name: {
		en: 'Bicycle',
		ja: 'Bicycle',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136503
		}
	}],
}

export default card
