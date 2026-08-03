import { Card } from "../../../interfaces"
import Set from "../SV8"

const card: Card = {
	set: Set,

	name: {
		en: 'Kecleon',
		ja: 'Kecleon',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 305465
		}
	}],
}

export default card
