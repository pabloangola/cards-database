import { Card } from "../../../interfaces"
import Set from "../PCG4"

const card: Card = {
	set: Set,

	name: {
		en: 'Poliwag',
		ja: 'Poliwag',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139107
		}
	}],
}

export default card
