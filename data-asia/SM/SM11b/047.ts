import { Card } from "../../../interfaces"
import Set from "../SM11b"

const card: Card = {
	set: Set,

	name: {
		en: 'Rosa',
		ja: 'Rosa',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 255193
		}
	}],
}

export default card
