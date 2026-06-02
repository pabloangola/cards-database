import { Card } from "../../../interfaces"
import Set from "../CSM1c"

const card: Card = {
	set: Set,

	name: {
		en: 'Counter Catcher',
		ja: 'Counter Catcher',
	},

	category: 'Pokemon',
	rarity: 'Secret Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370412
		}
	}],
}

export default card
