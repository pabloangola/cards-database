import { Card } from "../../../interfaces"
import Set from "../Sek"

const card: Card = {
	set: Set,

	name: {
		en: 'Quick Ball',
		ja: 'Quick Ball',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 154080
		}
	}],
}

export default card
