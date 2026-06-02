import { Card } from "../../../interfaces"
import Set from "../SM10"

const card: Card = {
	set: Set,

	name: {
		en: 'Meowth',
		ja: 'Meowth',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 137378
		}
	}],
}

export default card
