import { Card } from "../../../interfaces"
import Set from "../Cs5a"

const card: Card = {
	set: Set,

	name: {
		en: 'Charizard',
		ja: 'Charizard',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 311036
		}
	}],
}

export default card
