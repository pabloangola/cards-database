import { Card } from "../../../interfaces"
import Set from "../BW3b"

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
			cardtrader: 141252
		}
	}],
}

export default card
