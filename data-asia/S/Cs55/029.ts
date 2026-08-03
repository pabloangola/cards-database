import { Card } from "../../../interfaces"
import Set from "../Cs55"

const card: Card = {
	set: Set,

	name: {
		en: 'Gengar',
		ja: 'Gengar',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349388
		}
	}],
}

export default card
