import { Card } from "../../../interfaces"
import Set from "../XY2"

const card: Card = {
	set: Set,

	name: {
		en: 'Furret',
		ja: 'Furret',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144299
		}
	}],
}

export default card
