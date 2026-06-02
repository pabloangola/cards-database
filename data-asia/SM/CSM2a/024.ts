import { Card } from "../../../interfaces"
import Set from "../CSM2a"

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
			cardtrader: 353757
		}
	}],
}

export default card
