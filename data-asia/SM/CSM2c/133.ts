import { Card } from "../../../interfaces"
import Set from "../CSM2c"

const card: Card = {
	set: Set,

	name: {
		en: 'Giant Bomb',
		ja: 'Giant Bomb',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 353493
		}
	}],
}

export default card
