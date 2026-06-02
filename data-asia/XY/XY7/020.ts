import { Card } from "../../../interfaces"
import Set from "../XY7"

const card: Card = {
	set: Set,

	name: {
		en: 'Gyarados',
		ja: 'Gyarados',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135675
		}
	}],
}

export default card
