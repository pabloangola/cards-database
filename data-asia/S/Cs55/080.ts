import { Card } from "../../../interfaces"
import Set from "../Cs55"

const card: Card = {
	set: Set,

	name: {
		en: 'Roxanne',
		ja: 'Roxanne',
	},

	category: 'Pokemon',
	rarity: 'Special Illustration Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349459
		}
	}],
}

export default card
