import { Card } from "../../../interfaces"
import Set from "../CP2"

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
			cardtrader: 283187
		}
	}],
}

export default card
