import { Card } from "../../../interfaces"
import Set from "../EBB"

const card: Card = {
	set: Set,

	name: {
		en: 'Natu',
		ja: 'Natu',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 137702
		}
	}],
}

export default card
