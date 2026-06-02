import { Card } from "../../../interfaces"
import Set from "../CSV4C"

const card: Card = {
	set: Set,

	name: {
		en: 'Slowpoke',
		ja: 'Slowpoke',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 343591
		}
	}],
}

export default card
