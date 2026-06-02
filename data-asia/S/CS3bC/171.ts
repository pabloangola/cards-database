import { Card } from "../../../interfaces"
import Set from "../CS3bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Doctor',
		ja: 'Doctor',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 368870
		}
	}],
}

export default card
