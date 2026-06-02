import { Card } from "../../../interfaces"
import Set from "../SM12"

const card: Card = {
	set: Set,

	name: {
		en: 'Ursaring',
		ja: 'Ursaring',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135400
		}
	}],
}

export default card
