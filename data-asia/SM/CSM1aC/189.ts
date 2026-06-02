import { Card } from "../../../interfaces"
import Set from "../CSM1aC"

const card: Card = {
	set: Set,

	name: {
		en: 'Jasmine',
		ja: 'Jasmine',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369974
		}
	}],
}

export default card
