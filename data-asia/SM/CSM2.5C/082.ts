import { Card } from "../../../interfaces"
import Set from "../CSM2.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Rosa',
		ja: 'Rosa',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369672
		}
	}],
}

export default card
