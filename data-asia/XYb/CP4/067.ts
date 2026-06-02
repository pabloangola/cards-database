import { Card } from "../../../interfaces"
import Set from "../CP4"

const card: Card = {
	set: Set,

	name: {
		en: 'Machamp',
		ja: 'Machamp',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 271832
		}
	}],
}

export default card
