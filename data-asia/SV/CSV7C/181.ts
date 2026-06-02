import { Card } from "../../../interfaces"
import Set from "../CSV7C"

const card: Card = {
	set: Set,

	name: {
		en: 'Master Ball',
		ja: 'Master Ball',
	},

	category: 'Pokemon',
	rarity: 'ACE Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 367630
		}
	}],
}

export default card
