import { Card } from "../../../interfaces"
import Set from "../Sgg"

const card: Card = {
	set: Set,

	name: {
		en: 'Bruno',
		ja: 'Bruno',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 158593
		}
	}],
}

export default card
