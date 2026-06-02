import { Card } from "../../../interfaces"
import Set from "../CSV1C"

const card: Card = {
	set: Set,

	name: {
		en: 'Jacq',
		ja: 'Jacq',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 340205
		}
	}],
}

export default card
