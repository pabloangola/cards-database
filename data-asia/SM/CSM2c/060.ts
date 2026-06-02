import { Card } from "../../../interfaces"
import Set from "../CSM2c"

const card: Card = {
	set: Set,

	name: {
		en: 'Krokorok',
		ja: 'Krokorok',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 353400
		}
	}],
}

export default card
