import { Card } from "../../../interfaces"
import Set from "../ADV3"

const card: Card = {
	set: Set,

	name: {
		en: 'Gyarados',
		ja: 'Gyarados',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142037
		}
	}],
}

export default card
