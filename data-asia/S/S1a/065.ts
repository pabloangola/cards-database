import { Card } from "../../../interfaces"
import Set from "../S1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Sonia',
		ja: 'Sonia',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 254561
		}
	}],
}

export default card
