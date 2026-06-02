import { Card } from "../../../interfaces"
import Set from "../EBB"

const card: Card = {
	set: Set,

	name: {
		en: 'Deino',
		ja: 'Deino',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 137769
		}
	}],
}

export default card
