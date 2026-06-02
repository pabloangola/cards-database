import { Card } from "../../../interfaces"
import Set from "../CSV7C"

const card: Card = {
	set: Set,

	name: {
		en: 'Minccino',
		ja: 'Minccino',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 367619
		}
	}],
}

export default card
