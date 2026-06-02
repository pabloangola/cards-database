import { Card } from "../../../interfaces"
import Set from "../CP6"

const card: Card = {
	set: Set,

	name: {
		en: 'Magikarp',
		ja: 'Magikarp',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 138166
		}
	}],
}

export default card
