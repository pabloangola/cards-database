import { Card } from "../../../interfaces"
import Set from "../BW3b"

const card: Card = {
	set: Set,

	name: {
		en: 'Staryu',
		ja: 'Staryu',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 141215
		}
	}],
}

export default card
