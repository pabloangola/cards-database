import { Card } from "../../../interfaces"
import Set from "../CS3.5"

const card: Card = {
	set: Set,

	name: {
		en: 'Avery',
		ja: 'Avery',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 360849
		}
	}],
}

export default card
