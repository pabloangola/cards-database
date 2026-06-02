import { Card } from "../../../interfaces"
import Set from "../CSM1a"

const card: Card = {
	set: Set,

	name: {
		en: 'Durant',
		ja: 'Durant',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369869
		}
	}],
}

export default card
