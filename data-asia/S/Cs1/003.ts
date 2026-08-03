import { Card } from "../../../interfaces"
import Set from "../Cs1"

const card: Card = {
	set: Set,

	name: {
		en: 'Klink',
		ja: 'Klink',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 385477
		}
	}],
}

export default card
