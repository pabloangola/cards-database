import { Card } from "../../../interfaces"
import Set from "../CSM1cC"

const card: Card = {
	set: Set,

	name: {
		en: 'Mina',
		ja: 'Mina',
	},

	category: 'Pokemon',
	rarity: 'Ultra Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370395
		}
	}],
}

export default card
