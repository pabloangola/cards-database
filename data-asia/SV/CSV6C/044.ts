import { Card } from "../../../interfaces"
import Set from "../CSV6C"

const card: Card = {
	set: Set,

	name: {
		en: 'Elekid',
		ja: 'Elekid',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 361360
		}
	}],
}

export default card
