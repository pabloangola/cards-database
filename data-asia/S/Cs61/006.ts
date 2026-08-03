import { Card } from "../../../interfaces"
import Set from "../Cs61"

const card: Card = {
	set: Set,

	name: {
		en: 'Basic Lightning Energy',
		ja: 'Basic Lightning Energy',
	},

	category: 'Energy',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 349051
		}
	}],
}

export default card
