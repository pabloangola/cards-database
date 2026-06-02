import { Card } from "../../../interfaces"
import Set from "../CS4.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Gloria',
		ja: 'Gloria',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347696
		}
	}],
}

export default card
