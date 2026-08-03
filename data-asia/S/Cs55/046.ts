import { Card } from "../../../interfaces"
import Set from "../Cs55"

const card: Card = {
	set: Set,

	name: {
		en: 'Sudowoodo',
		ja: 'Sudowoodo',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349407
		}
	}],
}

export default card
