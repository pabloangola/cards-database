import { Card } from "../../../interfaces"
import Set from "../ADV3"

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
			cardtrader: 142057
		}
	}],
}

export default card
