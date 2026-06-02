import { Card } from "../../../interfaces"
import Set from "../BW3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Foongus',
		ja: 'Foongus',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139393
		}
	}],
}

export default card
