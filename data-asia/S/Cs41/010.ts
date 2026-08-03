import { Card } from "../../../interfaces"
import Set from "../Cs41"

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
			cardtrader: 342003
		}
	}],
}

export default card
