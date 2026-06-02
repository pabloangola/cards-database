import { Card } from "../../../interfaces"
import Set from "../CSM2c"

const card: Card = {
	set: Set,

	name: {
		en: 'Lickilicky',
		ja: 'Lickilicky',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 353455
		}
	}],
}

export default card
