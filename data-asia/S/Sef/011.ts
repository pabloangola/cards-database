import { Card } from "../../../interfaces"
import Set from "../Sef"

const card: Card = {
	set: Set,

	name: {
		en: 'Potion',
		ja: 'Potion',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 154061
		}
	}],
}

export default card
