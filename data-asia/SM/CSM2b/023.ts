import { Card } from "../../../interfaces"
import Set from "../CSM2b"

const card: Card = {
	set: Set,

	name: {
		en: 'Foongus',
		ja: 'Foongus',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 352827
		}
	}],
}

export default card
