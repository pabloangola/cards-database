import { Card } from "../../../interfaces"
import Set from "../CSM2b"

const card: Card = {
	set: Set,

	name: {
		en: 'Metapod',
		ja: 'Metapod',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 352809
		}
	}],
}

export default card
