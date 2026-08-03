import { Card } from "../../../interfaces"
import Set from "../S8ap"

const card: Card = {
	set: Set,

	name: {
		en: 'Shining Magikarp',
		ja: 'Shining Magikarp',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 171225
		}
	}],
}

export default card
