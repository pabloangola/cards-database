import { Card } from "../../../interfaces"
import Set from "../Cs55"

const card: Card = {
	set: Set,

	name: {
		en: 'Piplup',
		ja: 'Piplup',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349381
		}
	}],
}

export default card
