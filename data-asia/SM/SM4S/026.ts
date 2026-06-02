import { Card } from "../../../interfaces"
import Set from "../SM4S"

const card: Card = {
	set: Set,

	name: {
		en: 'Salandit',
		ja: 'Salandit',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135465
		}
	}],
}

export default card
