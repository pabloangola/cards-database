import { Card } from "../../../interfaces"
import Set from "../ADV4"

const card: Card = {
	set: Set,

	name: {
		en: 'Ekans',
		ja: 'Ekans',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140003
		}
	}],
}

export default card
