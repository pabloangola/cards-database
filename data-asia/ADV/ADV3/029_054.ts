import { Card } from "../../../interfaces"
import Set from "../ADV3"

const card: Card = {
	set: Set,

	name: {
		en: 'Spoink',
		ja: 'Spoink',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142052
		}
	}],
}

export default card
