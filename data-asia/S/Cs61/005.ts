import { Card } from "../../../interfaces"
import Set from "../Cs61"

const card: Card = {
	set: Set,

	name: {
		en: 'Basic Grass Energy',
		ja: 'Basic Grass Energy',
	},

	category: 'Energy',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349050
		}
	}],
}

export default card
