import { Card } from "../../../interfaces"
import Set from "../L1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Hoothoot',
		ja: 'Hoothoot',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139557
		}
	}],
}

export default card
