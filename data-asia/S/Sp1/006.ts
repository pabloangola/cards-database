import { Card } from "../../../interfaces"
import Set from "../Sp1"

const card: Card = {
	set: Set,

	name: {
		en: 'Poké Kid',
		ja: 'Poké Kid',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 322969
		}
	}],
}

export default card
