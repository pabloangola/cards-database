import { Card } from "../../../interfaces"
import Set from "../CS3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Golett',
		ja: 'Golett',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349545
		}
	}],
}

export default card
