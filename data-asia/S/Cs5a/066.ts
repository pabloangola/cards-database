import { Card } from "../../../interfaces"
import Set from "../Cs5a"

const card: Card = {
	set: Set,

	name: {
		en: 'Zubat',
		ja: 'Zubat',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 347188
		}
	}],
}

export default card
