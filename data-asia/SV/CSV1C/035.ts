import { Card } from "../../../interfaces"
import Set from "../CSV1C"

const card: Card = {
	set: Set,

	name: {
		en: 'Quaxly',
		ja: 'Quaxly',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 339422
		}
	}],
}

export default card
