import { Card } from "../../../interfaces"
import Set from "../SV8"

const card: Card = {
	set: Set,

	name: {
		en: 'Tapu Koko',
		ja: 'Tapu Koko',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 304638
		}
	}],
}

export default card
