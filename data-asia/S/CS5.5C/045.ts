import { Card } from "../../../interfaces"
import Set from "../CS5.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Machamp',
		ja: 'Machamp',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349404
		}
	}],
}

export default card
