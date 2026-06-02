import { Card } from "../../../interfaces"
import Set from "../L3"

const card: Card = {
	set: Set,

	name: {
		en: 'Black Belt',
		ja: 'Black Belt',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136359
		}
	}],
}

export default card
