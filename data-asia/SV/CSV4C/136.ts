import { Card } from "../../../interfaces"
import Set from "../CSV4C"

const card: Card = {
	set: Set,

	name: {
		en: 'Pidgey',
		ja: 'Pidgey',
	},

	category: 'Pokemon',
	rarity: 'Illustration Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 343685
		}
	}],
}

export default card
