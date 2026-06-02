import { Card } from "../../../interfaces"
import Set from "../BW2"

const card: Card = {
	set: Set,

	name: {
		en: 'Mienfoo',
		ja: 'Mienfoo',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 141516
		}
	}],
}

export default card
