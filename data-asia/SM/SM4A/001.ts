import { Card } from "../../../interfaces"
import Set from "../SM4A"

const card: Card = {
	set: Set,

	name: {
		en: 'Weedle',
		ja: 'Weedle',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144023
		}
	}],
}

export default card
