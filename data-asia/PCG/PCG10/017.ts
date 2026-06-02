import { Card } from "../../../interfaces"
import Set from "../PCG10"

const card: Card = {
	set: Set,

	name: {
		en: 'Omastar',
		ja: 'Omastar',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144428
		}
	}],
}

export default card
