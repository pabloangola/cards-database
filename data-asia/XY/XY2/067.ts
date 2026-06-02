import { Card } from "../../../interfaces"
import Set from "../XY2"

const card: Card = {
	set: Set,

	name: {
		en: 'Sentret',
		ja: 'Sentret',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144298
		}
	}],
}

export default card
