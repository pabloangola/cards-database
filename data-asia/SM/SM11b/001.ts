import { Card } from "../../../interfaces"
import Set from "../SM11b"

const card: Card = {
	set: Set,

	name: {
		en: 'Oddish',
		ja: 'Oddish',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 255149
		}
	}],
}

export default card
