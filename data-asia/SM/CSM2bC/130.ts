import { Card } from "../../../interfaces"
import Set from "../CSM2bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Surprise Box',
		ja: 'Surprise Box',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 353055
		}
	}],
}

export default card
