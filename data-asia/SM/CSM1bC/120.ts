import { Card } from "../../../interfaces"
import Set from "../CSM1bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Custom Catcher',
		ja: 'Custom Catcher',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370122
		}
	}],
}

export default card
