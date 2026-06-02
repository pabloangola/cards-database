import { Card } from "../../../interfaces"
import Set from "../XY11a"

const card: Card = {
	set: Set,

	name: {
		en: 'Foongus',
		ja: 'Foongus',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 138242
		}
	}],
}

export default card
