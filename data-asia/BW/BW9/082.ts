import { Card } from "../../../interfaces"
import Set from "../BW9"

const card: Card = {
	set: Set,

	name: {
		en: 'Iris',
		ja: 'Iris',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140164
		}
	}],
}

export default card
