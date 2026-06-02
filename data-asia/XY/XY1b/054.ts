import { Card } from "../../../interfaces"
import Set from "../XY1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Super Potion',
		ja: 'Super Potion',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136779
		}
	}],
}

export default card
