import { Card } from "../../../interfaces"
import Set from "../SM11b"

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
			cardtrader: 255222
		}
	}],
}

export default card
