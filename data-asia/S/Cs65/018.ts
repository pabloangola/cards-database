import { Card } from "../../../interfaces"
import Set from "../Cs65"

const card: Card = {
	set: Set,

	name: {
		en: 'Kyogre',
		ja: 'Kyogre',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 338149
		}
	}],
}

export default card
