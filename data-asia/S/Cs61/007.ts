import { Card } from "../../../interfaces"
import Set from "../Cs61"

const card: Card = {
	set: Set,

	name: {
		en: 'Basic Metal Energy',
		ja: 'Basic Metal Energy',
	},

	category: 'Energy',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349052
		}
	}],
}

export default card
