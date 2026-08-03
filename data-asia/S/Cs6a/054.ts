import { Card } from "../../../interfaces"
import Set from "../Cs6a"

const card: Card = {
	set: Set,

	name: {
		en: 'Salazzle',
		ja: 'Salazzle',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 320647
		}
	}],
}

export default card
