import { Card } from "../../../interfaces"
import Set from "../ADV3"

const card: Card = {
	set: Set,

	name: {
		en: 'Roselia',
		ja: 'Roselia',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142030
		}
	}],
}

export default card
