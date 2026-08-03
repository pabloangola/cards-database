import { Card } from "../../../interfaces"
import Set from "../Sek"

const card: Card = {
	set: Set,

	name: {
		en: 'Manaphy',
		ja: 'Manaphy',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 154075
		}
	}],
}

export default card
