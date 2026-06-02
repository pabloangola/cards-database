import { Card } from "../../../interfaces"
import Set from "../CSM1c"

const card: Card = {
	set: Set,

	name: {
		en: 'Wishiwashi',
		ja: 'Wishiwashi',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370240
		}
	}],
}

export default card
