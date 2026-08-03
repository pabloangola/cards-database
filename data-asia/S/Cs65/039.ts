import { Card } from "../../../interfaces"
import Set from "../Cs65"

const card: Card = {
	set: Set,

	name: {
		en: 'Murkrow',
		ja: 'Murkrow',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 338694
		}
	}],
}

export default card
