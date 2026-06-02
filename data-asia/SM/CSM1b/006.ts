import { Card } from "../../../interfaces"
import Set from "../CSM1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Pinsir',
		ja: 'Pinsir',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370008
		}
	}],
}

export default card
