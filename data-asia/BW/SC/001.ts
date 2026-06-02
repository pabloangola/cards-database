import { Card } from "../../../interfaces"
import Set from "../SC"

const card: Card = {
	set: Set,

	name: {
		en: 'Snivy',
		ja: 'Snivy',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 272943
		}
	}],
}

export default card
