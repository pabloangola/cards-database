import { Card } from "../../../interfaces"
import Set from "../CSV5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Bonsly',
		ja: 'Bonsly',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 350719
		}
	}],
}

export default card
