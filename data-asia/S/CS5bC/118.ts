import { Card } from "../../../interfaces"
import Set from "../CS5bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Ultra Ball',
		ja: 'Ultra Ball',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 346928
		}
	}],
}

export default card
