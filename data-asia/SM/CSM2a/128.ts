import { Card } from "../../../interfaces"
import Set from "../CSM2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Oranguru',
		ja: 'Oranguru',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 358171
		}
	}],
}

export default card
