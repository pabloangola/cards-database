import { Card } from "../../../interfaces"
import Set from "../EBB"

const card: Card = {
	set: Set,

	name: {
		en: 'Zekrom',
		ja: 'Zekrom',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 137698
		}
	}],
}

export default card
