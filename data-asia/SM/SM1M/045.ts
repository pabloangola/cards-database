import { Card } from "../../../interfaces"
import Set from "../SM1M"

const card: Card = {
	set: Set,

	name: {
		en: 'Spearow',
		ja: 'Spearow',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136560
		}
	}],
}

export default card
