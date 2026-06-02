import { Card } from "../../../interfaces"
import Set from "../BW1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Zorua',
		ja: 'Zorua',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144209
		}
	}],
}

export default card
