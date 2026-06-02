import { Card } from "../../../interfaces"
import Set from "../SM12"

const card: Card = {
	set: Set,

	name: {
		en: 'Ducklett',
		ja: 'Ducklett',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135345
		}
	}],
}

export default card
