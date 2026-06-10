import { Card } from "../../../interfaces"
import Set from "../M2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Numel',
		ja: 'Numel',
	},

	category: 'Pokemon',
	rarity: 'Illustration Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 360069
		}
	}],
}

export default card
