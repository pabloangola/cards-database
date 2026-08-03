import { Card } from "../../../interfaces"
import Set from "../Sf"

const card: Card = {
	set: Set,

	name: {
		en: 'Air Balloon',
		ja: 'Air Balloon',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 240240
		}
	}],
}

export default card
