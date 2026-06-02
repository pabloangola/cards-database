import { Card } from "../../../interfaces"
import Set from "../SM4S"

const card: Card = {
	set: Set,

	name: {
		en: 'Shellos',
		ja: 'Shellos',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135454
		}
	}],
}

export default card
