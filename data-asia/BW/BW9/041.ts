import { Card } from "../../../interfaces"
import Set from "../BW9"

const card: Card = {
	set: Set,

	name: {
		en: 'Machamp',
		ja: 'Machamp',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140123
		}
	}],
}

export default card
