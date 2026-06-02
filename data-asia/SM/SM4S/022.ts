import { Card } from "../../../interfaces"
import Set from "../SM4S"

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
			cardtrader: 135461
		}
	}],
}

export default card
