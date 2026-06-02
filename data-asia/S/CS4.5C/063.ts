import { Card } from "../../../interfaces"
import Set from "../CS4.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Gloria',
		ja: 'Gloria',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347683
		}
	}],
}

export default card
