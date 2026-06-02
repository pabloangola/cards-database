import { Card } from "../../../interfaces"
import Set from "../CS4bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Sidney',
		ja: 'Sidney',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337754
		}
	}],
}

export default card
