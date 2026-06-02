import { Card } from "../../../interfaces"
import Set from "../BW4"

const card: Card = {
	set: Set,

	name: {
		en: 'Vaporeon',
		ja: 'Vaporeon',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 137000
		}
	}],
}

export default card
