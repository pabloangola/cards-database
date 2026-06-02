import { Card } from "../../../interfaces"
import Set from "../XY2"

const card: Card = {
	set: Set,

	name: {
		en: 'Durant',
		ja: 'Durant',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144281
		}
	}],
}

export default card
