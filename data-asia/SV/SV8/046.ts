import { Card } from "../../../interfaces"
import Set from "../SV8"

const card: Card = {
	set: Set,

	name: {
		en: 'Togetic',
		ja: 'Togetic',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 304644
		}
	}],
}

export default card
