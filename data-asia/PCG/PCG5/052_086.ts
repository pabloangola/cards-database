import { Card } from "../../../interfaces"
import Set from "../PCG5"

const card: Card = {
	set: Set,

	name: {
		en: 'Golem',
		ja: 'Golem',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140464
		}
	}],
}

export default card
