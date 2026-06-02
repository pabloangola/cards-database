import { Card } from "../../../interfaces"
import Set from "../EBB"

const card: Card = {
	set: Set,

	name: {
		en: 'Meloetta',
		ja: 'Meloetta',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 137733
		}
	}],
}

export default card
