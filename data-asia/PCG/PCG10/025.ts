import { Card } from "../../../interfaces"
import Set from "../PCG10"

const card: Card = {
	set: Set,

	name: {
		en: 'Magnemite',
		ja: 'Magnemite',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144436
		}
	}],
}

export default card
