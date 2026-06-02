import { Card } from "../../../interfaces"
import Set from "../PCG5"

const card: Card = {
	set: Set,

	name: {
		en: 'Bellsprout',
		ja: 'Bellsprout',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140413
		}
	}],
}

export default card
