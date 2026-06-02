import { Card } from "../../../interfaces"
import Set from "../CSM1bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Cherubi',
		ja: 'Cherubi',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370025
		}
	}],
}

export default card
