import { Card } from "../../../interfaces"
import Set from "../SM3N"

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
			cardtrader: 137109
		}
	}],
}

export default card
