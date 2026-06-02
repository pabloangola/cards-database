import { Card } from "../../../interfaces"
import Set from "../ADV2"

const card: Card = {
	set: Set,

	name: {
		en: 'Pichu',
		ja: 'Pichu',
	},

	category: 'Pokemon',
	rarity: 'Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140383
		}
	}],
}

export default card
