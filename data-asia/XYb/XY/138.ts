import { Card } from "../../../interfaces"
import Set from "../XY"

const card: Card = {
	set: Set,

	name: {
		en: 'AZ',
		ja: 'AZ',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 284955
		}
	}],
}

export default card
