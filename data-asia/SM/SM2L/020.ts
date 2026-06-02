import { Card } from "../../../interfaces"
import Set from "../SM2L"

const card: Card = {
	set: Set,

	name: {
		en: 'Mimikyu',
		ja: 'Mimikyu',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135280
		}
	}],
}

export default card
