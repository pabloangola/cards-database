import { Card } from "../../../interfaces"
import Set from "../Cs61"

const card: Card = {
	set: Set,

	name: {
		en: 'Worker',
		ja: 'Worker',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349064
		}
	}],
}

export default card
