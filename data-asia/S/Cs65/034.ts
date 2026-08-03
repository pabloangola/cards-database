import { Card } from "../../../interfaces"
import Set from "../Cs65"

const card: Card = {
	set: Set,

	name: {
		en: 'Espurr',
		ja: 'Espurr',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 338697
		}
	}],
}

export default card
