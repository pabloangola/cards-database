import { Card } from "../../../interfaces"
import Set from "../BW9"

const card: Card = {
	set: Set,

	name: {
		en: 'Snover',
		ja: 'Snover',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140101
		}
	}],
}

export default card
