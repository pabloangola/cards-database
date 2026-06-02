import { Card } from "../../../interfaces"
import Set from "../BW1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Pansear',
		ja: 'Pansear',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136001
		}
	}],
}

export default card
