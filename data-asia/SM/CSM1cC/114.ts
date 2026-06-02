import { Card } from "../../../interfaces"
import Set from "../CSM1cC"

const card: Card = {
	set: Set,

	name: {
		en: 'Stufful',
		ja: 'Stufful',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370320
		}
	}],
}

export default card
