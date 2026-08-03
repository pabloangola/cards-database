import { Card } from "../../../interfaces"
import Set from "../Cs41"

const card: Card = {
	set: Set,

	name: {
		en: 'Ducklett',
		ja: 'Ducklett',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 341986
		}
	}],
}

export default card
