import { Card } from "../../../interfaces"
import Set from "../CSM1cC"

const card: Card = {
	set: Set,

	name: {
		en: 'Ultra Ball',
		ja: 'Ultra Ball',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370414
		}
	}],
}

export default card
