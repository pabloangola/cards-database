import { Card } from "../../../interfaces"
import Set from "../ADV2"

const card: Card = {
	set: Set,

	name: {
		en: 'Lombre',
		ja: 'Lombre',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140378
		}
	}],
}

export default card
