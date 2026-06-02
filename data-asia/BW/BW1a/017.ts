import { Card } from "../../../interfaces"
import Set from "../BW1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Cubchoo',
		ja: 'Cubchoo',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136008
		}
	}],
}

export default card
