import { Card } from "../../../interfaces"
import Set from "../Cs65"

const card: Card = {
	set: Set,

	name: {
		en: 'Hatterene VMAX',
		ja: 'Hatterene VMAX',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 338691
		}
	}],
}

export default card
