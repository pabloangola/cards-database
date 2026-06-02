import { Card } from "../../../interfaces"
import Set from "../CSM2aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Raichu',
		ja: 'Raichu',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 353838
		}
	}],
}

export default card
