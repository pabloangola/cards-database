import { Card } from "../../../interfaces"
import Set from "../BW1b"

const card: Card = {
	set: Set,

	name: {
		en: 'PlusPower',
		ja: 'PlusPower',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144225
		}
	}],
}

export default card
