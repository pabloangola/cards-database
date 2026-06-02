import { Card } from "../../../interfaces"
import Set from "../SM3N"

const card: Card = {
	set: Set,

	name: {
		en: 'Pikachu',
		ja: 'Pikachu',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 137077
		}
	}],
}

export default card
