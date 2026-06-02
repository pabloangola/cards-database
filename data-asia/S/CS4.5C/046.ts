import { Card } from "../../../interfaces"
import Set from "../CS4.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Wooloo',
		ja: 'Wooloo',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347666
		}
	}],
}

export default card
