import { Card } from "../../../interfaces"
import Set from "../SMP2"

const card: Card = {
	set: Set,

	name: {
		en: 'Lt. Yoshida',
		ja: 'Lt. Yoshida',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 255300
		}
	}],
}

export default card
