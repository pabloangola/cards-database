import { Card } from "../../../interfaces"
import Set from "../SMP2"

const card: Card = {
	set: Set,

	name: {
		en: 'Lickitung',
		ja: 'Lickitung',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 255299
		}
	}],
}

export default card
