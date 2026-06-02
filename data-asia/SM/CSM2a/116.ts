import { Card } from "../../../interfaces"
import Set from "../CSM2a"

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
			cardtrader: 358159
		}
	}],
}

export default card
