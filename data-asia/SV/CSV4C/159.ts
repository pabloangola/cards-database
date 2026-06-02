import { Card } from "../../../interfaces"
import Set from "../CSV4C"

const card: Card = {
	set: Set,

	name: {
		en: 'Rika',
		ja: 'Rika',
	},

	category: 'Pokemon',
	rarity: 'Special Illustration Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 343708
		}
	}],
}

export default card
