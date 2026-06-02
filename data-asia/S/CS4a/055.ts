import { Card } from "../../../interfaces"
import Set from "../CS4a"

const card: Card = {
	set: Set,

	name: {
		en: 'Toxel',
		ja: 'Toxel',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337009
		}
	}],
}

export default card
