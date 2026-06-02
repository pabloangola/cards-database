import { Card } from "../../../interfaces"
import Set from "../BW2"

const card: Card = {
	set: Set,

	name: {
		en: 'Meowth',
		ja: 'Meowth',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 141551
		}
	}],
}

export default card
