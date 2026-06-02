import { Card } from "../../../interfaces"
import Set from "../CSM1cC"

const card: Card = {
	set: Set,

	name: {
		en: 'Cynthia',
		ja: 'Cynthia',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370392
		}
	}],
}

export default card
