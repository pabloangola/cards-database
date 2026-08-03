import { Card } from "../../../interfaces"
import Set from "../Cs55"

const card: Card = {
	set: Set,

	name: {
		en: 'Moltres',
		ja: 'Moltres',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 311037
		}
	}],
}

export default card
