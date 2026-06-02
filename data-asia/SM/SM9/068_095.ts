import { Card } from "../../../interfaces"
import Set from "../SM9"

const card: Card = {
	set: Set,

	name: {
		en: 'Pidgey',
		ja: 'Pidgey',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 143456
		}
	}],
}

export default card
