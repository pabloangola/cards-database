import { Card } from "../../../interfaces"
import Set from "../L3"

const card: Card = {
	set: Set,

	name: {
		en: 'Celebi',
		ja: 'Celebi',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136228
		}
	}],
}

export default card
