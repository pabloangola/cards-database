import { Card } from "../../../interfaces"
import Set from "../CSM1.5"

const card: Card = {
	set: Set,

	name: {
		en: 'Evelyn',
		ja: 'Evelyn',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369768
		}
	}],
}

export default card
