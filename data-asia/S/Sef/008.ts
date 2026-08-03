import { Card } from "../../../interfaces"
import Set from "../Sef"

const card: Card = {
	set: Set,

	name: {
		en: 'Gossifleur',
		ja: 'Gossifleur',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 154058
		}
	}],
}

export default card
