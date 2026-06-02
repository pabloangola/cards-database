import { Card } from "../../../interfaces"
import Set from "../CSM2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Will',
		ja: 'Will',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 358228
		}
	}],
}

export default card
