import { Card } from "../../../interfaces"
import Set from "../SV8"

const card: Card = {
	set: Set,

	name: {
		en: 'Kecleon',
		ja: 'Kecleon',
	},

	category: 'Pokemon',
	rarity: 'Illustration Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 305464
		}
	}],
}

export default card
