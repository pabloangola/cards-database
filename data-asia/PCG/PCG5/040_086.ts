import { Card } from "../../../interfaces"
import Set from "../PCG5"

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
			cardtrader: 140452
		}
	}],
}

export default card
