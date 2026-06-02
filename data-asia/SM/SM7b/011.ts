import { Card } from "../../../interfaces"
import Set from "../SM7b"

const card: Card = {
	set: Set,

	name: {
		en: 'Combee',
		ja: 'Combee',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 282058
		}
	}],
}

export default card
