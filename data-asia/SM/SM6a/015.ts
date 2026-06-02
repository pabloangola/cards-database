import { Card } from "../../../interfaces"
import Set from "../SM6a"

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
			cardtrader: 304734
		}
	}],
}

export default card
