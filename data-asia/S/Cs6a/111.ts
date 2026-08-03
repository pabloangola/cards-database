import { Card } from "../../../interfaces"
import Set from "../Cs6a"

const card: Card = {
	set: Set,

	name: {
		en: 'Shaymin',
		ja: 'Shaymin',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345699
		}
	}],
}

export default card
