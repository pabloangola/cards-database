import { Card } from "../../../interfaces"
import Set from "../CS5.5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Squirtle',
		ja: 'Squirtle',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 311038
		}
	}],
}

export default card
