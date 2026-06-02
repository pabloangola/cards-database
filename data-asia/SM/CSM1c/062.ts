import { Card } from "../../../interfaces"
import Set from "../CSM1c"

const card: Card = {
	set: Set,

	name: {
		en: 'Minior',
		ja: 'Minior',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370268
		}
	}],
}

export default card
