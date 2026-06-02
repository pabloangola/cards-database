import { Card } from "../../../interfaces"
import Set from "../CSM1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Fletchling',
		ja: 'Fletchling',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369900
		}
	}],
}

export default card
