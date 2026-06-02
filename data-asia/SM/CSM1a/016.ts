import { Card } from "../../../interfaces"
import Set from "../CSM1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Combusken',
		ja: 'Combusken',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369801
		}
	}],
}

export default card
