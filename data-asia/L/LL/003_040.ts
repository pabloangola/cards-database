import { Card } from "../../../interfaces"
import Set from "../LL"

const card: Card = {
	set: Set,

	name: {
		en: 'Tangela',
		ja: 'Tangela',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 146359
		}
	}],
}

export default card
